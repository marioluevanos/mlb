import { GameData } from "./App";
import { TeamClub } from "./Team";
import { CSSProperties } from "react";

export function formatDate(date: string) {
  return new Date(formatDateInput(date)).toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  function formatDateInput(date = "") {
    const [year, month, end] = date.split("-").map((v) => v);
    if (!year && !month && !end) return new Date();
    const [day = "0"] = end.split("T") || [];
    return new Date(Number(year), Number(month) - 1, Number(day));
  }
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
  if (!date) return "time unknown";

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
        isLoading: true,
        id: i,
        link: "",
        status: "Final",
        away: {
          startingPitcher: "",
          record: { wins: 7, losses: 4, pct: "XXXX" },
          name: "XXX XXXXXXX XXXXXXX",
          score: { runs: 10, hits: 11, errors: 1, leftOnBase: 3 },
          abbreviation: "XXX",
          logo: "",
        },
        home: {
          startingPitcher: "",
          record: { wins: 5, losses: 6, pct: "XXXX" },
          name: "XXXXX XXX XXXXX",
          score: { runs: 10, hits: 3, errors: 1, leftOnBase: 3 },
          abbreviation: "XXX",
          logo: "",
        },
        time: "XX:XX XX",
        currentInning: "BOT 6th",
        highlights: [],
        topPerformers: [],
        streams: [
          {
            name: "Link 1HD",
            url: "",
          },
          {
            name: "Link 2HD",
            url: "",
          },
          {
            name: "Link 3",
            url: "",
          },
          {
            name: "Link 4",
            url: "",
          },
        ],
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
