import { CurrentMatchup } from "../Game";

/**
 * Updated the current game matchup, Batter vs Pitcher
 */
export async function updateMatchup(
  matchup: CurrentMatchup,
  gameId: number
): Promise<CurrentMatchup | undefined> {
  const { batter, pitcher } = matchup;
  const [batterResponse, pitcherResponse] = await Promise.all([
    getPlayerGameStats(batter.id, gameId),
    getPlayerGameStats(pitcher.id, gameId),
  ]);

  const gameHitting = getGameStats(batterResponse, "hitting");
  const gamePitching = getGameStats(pitcherResponse, "pitching");

  let numberOfPitches = "";
  if (
    gamePitching?.stat &&
    "numberOfPitches" in gamePitching.stat &&
    gamePitching.stat.numberOfPitches > 0
  ) {
    numberOfPitches = `P ${gamePitching?.stat?.numberOfPitches}, `;
  }

  return {
    batter: {
      ...batter,
      summary: gameHitting?.stat?.summary || "",
    },
    pitcher: {
      ...pitcher,
      summary: `${numberOfPitches}${gamePitching?.stat?.summary || ""}`,
    },
  };
}

// async function getPlayerStats(
//   playerIds: (string | number)[],
//   group: "pitching" | "hitting",
//   season: number = 2025
// ) {
//   const ids = playerIds.map((id) => `personIds=${id}`).join("&");
//   const URL = `https://statsapi.mlb.com/api/v1/people?${ids}&season=${season}&hydrate=stats(group=${group},type=season,season=${season},gameType=[R])`;
//   try {
//     const response = await fetch(URL);
//     if (response.ok) {
//       const json = response.json();
//       return json;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

type MLBPitchingStats = {
  summary: string;
  numberOfPitches: number;
};

type MLBHittingStats = {
  summary: string;
};

type MLBPlayerGameStats = {
  stats: {
    splits: {
      group: "pitching" | "hitting";
      stat: MLBHittingStats | MLBPitchingStats;
    }[];
  }[];
};

async function getPlayerGameStats(
  playerId: number,
  gameId: number
): Promise<MLBPlayerGameStats | undefined> {
  const URL = `https://statsapi.mlb.com/api/v1/people/${playerId}/stats/game/${gameId}`;

  try {
    const response = await fetch(URL);
    if (response.ok) {
      const json = await response.json();
      return json;
    }
  } catch (error) {
    console.log(error);
  }
}

// export async function getStandings() {
//   const [date] = new Date().toISOString().split("T");
//   const [year] = date.split("-");
//   const URL = `https://bdfed.stitch.mlbinfra.com/bdfed/transform-mlb-standings?&splitPcts=false&numberPcts=false&standingsView=division&sortTemplate=3&season=${year}&leagueIds=103&&leagueIds=104&standingsTypes=regularSeason&contextTeamId=&teamId=&date=${date}&hydrateAlias=noSchedule&sortDivisions=201,202,200,204,205,203&sortLeagues=103,104,115,114&sortSports=1`;

//   try {
//     const response = await fetch(URL);
//     if (response.ok) {
//       const json = response.json();
//       return json;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

function getGameStats(
  gameStats: MLBPlayerGameStats | undefined,
  group: "hitting" | "pitching"
) {
  const [stats] = gameStats?.stats || [];
  return (stats.splits || []).find((s) => s.group === group);
}
