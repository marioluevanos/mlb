import { Decisions, MLBLive, Performer, Player } from "../mlb.types";
import { GamePlayer, GameStatus, GameToday, TeamClub } from "../types";

function toGamePlayer(p: Player): GamePlayer {
  return {
    game: {
      batting: p.stats.batting,
      pitching: p.stats.pitching,
    },
    season: {
      batting: p.seasonStats.batting,
      pitching: p.seasonStats.pitching,
    },
    jerseyNumber: p.jerseyNumber,
    battingOrder: p.battingOrder ? Number(p.battingOrder) : undefined,
    position: p.position.abbreviation,
    fullName: p.person.fullName,
    id: p.person.id,
    avatar: avatar(p.person.id),
  };
}

const mapToTeam = (team: "home" | "away", data: MLBLive): TeamClub => {
  const { gameData, liveData } = data;
  const { linescore, boxscore } = liveData;
  const { teams, probablePitchers } = gameData;
  const players = Object.values(boxscore.teams[team].players).map(toGamePlayer);
  const pitcher = players.find((p) => p.id === probablePitchers?.[team]?.id);
  const pitching = pitcher?.season?.pitching;
  const [first, last] = probablePitchers?.[team]?.fullName.split(" ");
  const startingPitcher: GamePlayer = {
    ...pitcher,
    fullName: `${first.slice(0, 1)}. ${last}`,
    id: probablePitchers?.[team]?.id,
    avatar: avatar(probablePitchers?.[team]?.id),
    position: `${pitching?.wins} — ${pitching?.losses}`,
    summary: `${pitching?.earnedRuns} ERA, ${pitching?.whip} WHIP`,
  };

  console.log({ startingPitcher });

  return {
    record: teams[team].record.leagueRecord,
    name: teams[team].name,
    id: teams[team].id,
    score: linescore.teams[team],
    startingPitcher,
    abbreviation: teams?.[team].abbreviation,
    logo: logo(teams[team].id),
    ...boxscore.teams[team].teamStats,
    players,
  };
};

export function mapToGame(g: GameToday, data: MLBLive): GameToday {
  const { gameData, liveData } = data;
  const { linescore, boxscore, plays, decisions } = liveData;
  const { currentPlay } = plays;
  const { offense } = linescore;
  const awayTeam = mapToTeam("away", data);
  const homeTeam = mapToTeam("home", data);
  const status = gameData.status.detailedState;

  return {
    ...g,
    status,
    away: awayTeam,
    home: homeTeam,
    innings: linescore.innings,
    topPerformers: boxscore.topPerformers.map(topPerformers) || [],
    currentPlay: {
      count: currentPlay?.count,
      events: currentPlay?.playEvents.map((e) => ({
        event:
          "event" in e.details && typeof e.details.event === "string"
            ? e.details.event
            : "",
        description: e.details.description,
      })),
      runners: {
        second: offense.second,
        third: offense.third,
        first: offense.first,
      },
      matchup: {
        batter: {
          ...currentPlay?.matchup.batter,
          avatar: avatar(currentPlay?.matchup.batter.id),
          bats: currentPlay?.matchup.batSide.code,
        },
        pitcher: {
          ...currentPlay?.matchup.pitcher,
          avatar: avatar(currentPlay?.matchup.pitcher.id),
          throws: currentPlay?.matchup.pitchHand.code,
        },
      },
    },
    currentInning: `${linescore?.inningHalf?.slice(0, 3).toUpperCase() || ""} ${
      linescore?.currentInningOrdinal || 0
    }`,
    decisions: getDecision(status, decisions, awayTeam, homeTeam),
  };
}

function getDecision(
  state: GameStatus,
  decisions: Decisions,
  away: TeamClub,
  home: TeamClub
):
  | {
      winner: GamePlayer;
      loser: GamePlayer;
      save?: GamePlayer;
    }
  | undefined {
  const final = state === "Final" || state === "Game Over";

  if (!final) return;

  const winner =
    Number(away.score.runs) > Number(home.score.runs) ? "away" : "home";
  const looser =
    Number(away.score.runs) < Number(home.score.runs) ? "away" : "home";
  const teams = { home, away };

  const wp = teams[winner]?.players.find((p) => p.id === decisions.winner.id);
  const lp = teams[looser]?.players.find((p) => p.id === decisions.loser.id);
  const sv = teams[winner]?.players.find((p) => p.id === decisions.save?.id);

  return {
    winner: wp || decisions.winner,
    loser: lp || decisions.loser,
    save: sv || decisions.save,
  };
}

function topPerformers(payload: Performer): GamePlayer {
  const { type, player } = payload;
  const { stats, person, position, seasonStats } = player;
  let summary = "";

  if (type === "hitter" && stats.batting.summary) {
    summary = stats.batting.summary;
  }

  if (type === "starter" && stats.pitching.summary) {
    summary = stats.pitching.summary;
  }

  return {
    avatar: avatar(person.id),
    jerseyNumber: player.jerseyNumber,
    id: person.id,
    fullName: person.fullName,
    position: position.abbreviation,
    summary,
    game: {
      batting: stats.batting,
      pitching: stats.pitching,
    },
    season: {
      batting: seasonStats.batting,
      pitching: seasonStats.pitching,
    },
  };
}

function avatar(id: string | number | undefined) {
  if (!id) return;

  return `https://midfield.mlbstatic.com/v1/people/${id}/spots/120`;
}

function logo(teamId: number | string | undefined) {
  if (!teamId) return "";

  return `https://midfield.mlbstatic.com/v1/team/${teamId}/spots/64`;
}
