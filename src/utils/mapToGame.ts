import { GameToday, GameTopPerformers } from "../Game";
import { Decisions, MLBLive, Performer } from "../mlb.types";
import { TeamClub } from "../Team";

export function mapToGame(g: GameToday, data: MLBLive): GameToday {
  const { gameData, liveData } = data;
  const { linescore, boxscore, plays } = liveData;
  const play = plays?.currentPlay;
  const { offense } = liveData?.linescore;
  const { teams, probablePitchers } = gameData;

  const mapToTeam = (team: "home" | "away"): TeamClub => {
    const players: TeamClub["stats"]["players"] = Object.values(
      boxscore.teams[team].players
    ).map((p) => ({
      game: {
        batting: p.stats.batting,
        pitching: p.stats.pitching,
      },
      season: {
        batting: p.seasonStats.batting,
        pitching: p.seasonStats.pitching,
      },
      position: p.position.abbreviation,
      fullName: p.person.fullName,
      id: p.person.id,
      avatar: avatar(p.person.id),
    }));

    const order = boxscore.teams[team].battingOrder.reduce<
      TeamClub["stats"]["players"]
    >((acc, id) => {
      const player = players.find((p) => p.id === id);

      if (player) acc.push(player);

      return acc;
    }, []);

    return {
      record: teams[team].record.leagueRecord,
      name: teams[team].name,
      id: teams[team].id,
      score: linescore.teams[team],
      startingPitcher: {
        fullName: probablePitchers?.[team]?.fullName,
        id: probablePitchers?.[team]?.id,
        avatar: avatar(probablePitchers?.[team]?.id),
      },
      abbreviation: teams?.[team].abbreviation,
      logo: logo(teams[team].id),
      stats: {
        team: boxscore.teams[team].teamStats,
        players: order,
      },
    };
  };

  return {
    ...g,
    status: gameData.status.detailedState,
    away: mapToTeam("away"),
    home: mapToTeam("home"),
    innings: linescore.innings,
    topPerformers: boxscore.topPerformers.map(topPerformers) || [],
    currentPlay: {
      count: play?.count,
      events: [],
      // events: play.playEvents.map((e) => ({
      //   event:
      //     "event" in e.details && typeof e.details.event === "string"
      //       ? e.details.event
      //       : "",
      //   description: e.details.description,
      // })),
      runners: {
        second: offense.second,
        third: offense.third,
        first: offense.first,
      },
      matchup: {
        batter: {
          ...play?.matchup.batter,
          avatar: avatar(play?.matchup.batter.id),
          bats: play?.matchup.batSide.code,
        },
        pitcher: {
          ...play?.matchup.pitcher,
          avatar: avatar(play?.matchup.pitcher.id),
          throws: play?.matchup.pitchHand.code,
        },
      },
    },
    currentInning: `${linescore?.inningHalf?.slice(0, 3).toUpperCase() || ""} ${
      linescore?.currentInningOrdinal || 0
    }`,
  };
}

function topPerformers(payload: Performer): GameTopPerformers {
  const { type, player } = payload;
  const { stats, person, position } = player;
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
    pos: position.abbreviation,
    summary,
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

/**
 * Asset an `href` as PathNames
 */
export const isDecision = (
  href: string | keyof Decisions
): href is keyof Decisions => ["winner", "loser", "save"].includes(href);
