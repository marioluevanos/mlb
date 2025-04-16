import { GameData } from "./App";
import { GameToday, GameTopPerformers } from "./Game";
import { TeamClub } from "./Team";
import { CSSProperties } from "react";

export function formatDate(date: string) {
  const [d, m, y] = formatDateInput(date);
  return new Date(d, m, y).toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateInput(date = ""): [number, number, number] {
  const [year, month, end] = date.split("-").map((v) => v);
  if (!year && !month && !end) return [0, 0, 0];

  const [day = "0"] = end.split("T") || [];
  return [Number(year), Number(month) - 1, Number(day)];
}

export function previousDay(date: string): string {
  const [year, month, end] = date.split("-").map((v) => v);
  if (!year && !month && !end) return "";

  const [day = "0"] = end.split("T") || [];
  return [Number(year), Number(month), Number(day) - 1].join("-");
}

export function nextDay(date: string): string {
  const [year, month, end] = date.split("-").map((v) => v);
  if (!year && !month && !end) return "";

  const [day = "0"] = end.split("T") || [];
  return [Number(year), Number(month), Number(day) + 1].join("-");
}

type Unit =
  | "year"
  | "quarter"
  | "month"
  | "week"
  | "day"
  | "hour"
  | "minute"
  | "second";

const divisions = [
  { amount: 60, name: "seconds" },
  { amount: 60, name: "minutes" },
  { amount: 24, name: "hours" },
  { amount: 7, name: "days" },
  { amount: 4.34524, name: "weeks" },
  { amount: 12, name: "months" },
  { amount: Number.POSITIVE_INFINITY, name: "years" },
];

/**
 * Format a date.
 */
export function timeAgo(date: string | number | undefined, locale?: string) {
  if (!date) return "";

  const formatter = new Intl.RelativeTimeFormat(locale, {
    numeric: "auto",
    style: "short",
  });

  let duration = (+new Date(date) - +new Date()) / 1000;

  for (let i = 0; i <= divisions.length; i++) {
    const division = divisions[i];
    if (Math.abs(duration) < division.amount) {
      const timeAgo = formatter.format(
        Math.round(duration),
        division.name as Unit
      );
      return timeAgo;
    }
    duration /= division.amount;
  }

  return "time unknown";
}

type Value = string | number | boolean | undefined | null;
type Mapping = Record<string, unknown>;
type ArgumentArray = Array<Argument>;
type Argument = Value | Mapping | ArgumentArray;

/**
 * A simple JavaScript utility for conditionally joining cn together.
 */
export function cn(...args: ArgumentArray): string;

export default function cn(...args: ArgumentArray): string {
  const classes = [];
  const hasOwn = {}.hasOwnProperty;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;

    const argType = typeof arg;

    if (argType === "string" || argType === "number") {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      if (arg.length) {
        const inner = cn(...arg);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (argType === "object") {
      if (
        typeof arg === "object" &&
        arg.toString === Object.prototype.toString
      ) {
        for (const key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      } else {
        classes.push(arg.toString());
      }
    }
  }

  return classes.join(" ");
}

export function isWinner(home: TeamClub, away: TeamClub) {
  if (home && away) {
    if (home.score && home.score.runs > away.score.runs) {
      return "home";
    }

    if (home.score && home.score.runs < away.score.runs) {
      return "away";
    }
  }
}

export function loadingData(cacheKey?: string): GameData {
  if (cacheKey) {
    const cache = JSON.parse(localStorage.getItem(cacheKey) || "{}");

    if (cache && Array.isArray(cache.games)) {
      return cache;
    }
  }

  return {
    date: "",
    games: Array.from({ length: 8 }, (_, i) => {
      return {
        id: i,
        feed: "",
        status: "Final",
        innings: [],
        away: {
          startingPitcher: {
            fullName: "XXXXXXXXXXXX",
            avatar: "",
            id: i,
          },
          record: { wins: 0, losses: 0, pct: "XXXX" },
          name: "XXX XXXXXXX XXXXXXX",
          score: { runs: 0, hits: 0, errors: 0, leftOnBase: 0 },
          abbreviation: "XXX",
          logo: "",
        },
        home: {
          startingPitcher: {
            fullName: "XXXXXXXXXXXX",
            avatar: "",
            id: i,
          },
          record: { wins: 0, losses: 0, pct: "XXXX" },
          name: "XXXXX XXX XXXXX",
          score: { runs: 0, hits: 0, errors: 0, leftOnBase: 0 },
          abbreviation: "XXX",
          logo: "",
        },
        time: "XX:XX XX",
        currentInning: "TOP 1st",
        highlights: [],
        topPerformers: [],
        streams: [],
      };
    }),
  };
}

interface CSSVariables extends CSSProperties {
  [key: string]: unknown;
}

/**
 * Add custom CSS properties to an element.
 */
export function cssVars(keyValue: CSSVariables): CSSVariables {
  return keyValue;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapToGame(game: GameToday, data: any): GameToday {
  const play = data.liveData?.plays?.currentPlay;
  const offense = data.liveData?.linescore.offense;
  const { linescore, boxscore } = data.liveData;

  return {
    ...game,
    innings: linescore.innings,
    home: {
      ...game.home,
      score: linescore.teams.home,
    },
    away: {
      ...game.away,
      score: linescore.teams.away,
    },
    topPerformers: boxscore.topPerformers.map(topPerformers) || [],
    currentPlay: {
      count: play?.count,
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
    status: data.gameData.status.detailedState,
    currentInning: `${linescore?.inningHalf?.slice(0, 3).toUpperCase() || ""} ${
      linescore?.currentInningOrdinal || 0
    }`,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function topPerformers(payload: any): GameTopPerformers {
  const { type, player } = payload;
  const { stats, person, position } = player;
  let summary = "";

  if (type === "hitter") {
    summary = stats.batting.summary;
  }

  if (type === "starter") {
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

function avatar(id: string) {
  return `https://midfield.mlbstatic.com/v1/people/${id}/spots/120`;
}

export async function getPlayerStats(
  playerIds: (string | number)[],
  group: "pitching" | "hitting",
  season: number = 2025
) {
  const ids = playerIds.map((id) => `personIds=${id}`).join("&");

  const URL = `https://statsapi.mlb.com/api/v1/people?${ids}&season=${season}&hydrate=stats(group=${group},type=season,season=${season},gameType=[R])`;
  try {
    const response = await fetch(URL);
    if (response.ok) {
      const json = response.json();
      return json;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getPlayerGameStats(playerId: number, gameId: number) {
  const URL = `https://statsapi.mlb.com/api/v1/people/${playerId}/stats/game/${gameId}`;

  try {
    const response = await fetch(URL);
    if (response.ok) {
      const json = response.json();
      return json;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getStatings() {
  const [date] = new Date().toISOString().split("T");
  const [year] = date.split("-");
  const URL = `https://bdfed.stitch.mlbinfra.com/bdfed/transform-mlb-standings?&splitPcts=false&numberPcts=false&standingsView=division&sortTemplate=3&season=${year}&leagueIds=103&&leagueIds=104&standingsTypes=regularSeason&contextTeamId=&teamId=&date=${date}&hydrateAlias=noSchedule&sortDivisions=201,202,200,204,205,203&sortLeagues=103,104,115,114&sortSports=1`;

  try {
    const response = await fetch(URL);
    if (response.ok) {
      const json = response.json();
      return json;
    }
  } catch (error) {
    console.log(error);
  }
}
