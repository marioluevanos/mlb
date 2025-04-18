import { BattingRecord, FieldingRecord, PitchingRecord } from "./mlb.types";

export type PlayEvent = {
  event: string;
  description: string;
};

export type TeamRecord = {
  wins: number;
  losses: number;
  pct: string;
};

export type TeamStats = {
  batting: BattingRecord;
  pitching: PitchingRecord;
  fielding?: FieldingRecord;
};

export type TeamClub = {
  record: TeamRecord;
  name: string;
  startingPitcher: GamePlayer;
  score: TeamScore;
  abbreviation: string;
  logo: string;
  id: number;
  players: GamePlayer[];
} & Partial<TeamStats>;

export type TeamRoster = GamePlayer;

export type GameStatus =
  | "Final"
  | "Scheduled"
  | "Pre-Game"
  | "Postponed"
  | "In Progress"
  | "Game Over"
  | "Warmup"
  // Check these with startsWith
  | "Umpire review"
  | "Manager challenge";

export type GameHighlight = {
  type: string;
  title: string;
  description?: string;
  placeholder: {
    sm: {
      src: string;
      width: number;
      height: number;
    };
    lg: {
      src: string;
      width: number;
      height: number;
    };
  };
  video: {
    url: string;
  };
};

export type GameStream = {
  name: string;
  url: string;
};

export type TeamScore = {
  runs?: number;
  hits: number;
  errors: number;
  leftOnBase: number;
};

export type GameInnings = {
  away: TeamScore;
  home: TeamScore;
  num: number;
  ordinalNum: string;
};

export type GameToday = {
  id: number;
  feed: string;
  content: string;
  status: GameStatus;
  away: TeamClub;
  home: TeamClub;
  time: string;
  currentInning: string;
  topPerformers: GamePlayer[];
  highlights: GameHighlight[];
  streams: GameStream[];
  innings: GameInnings[];
  currentPlay?: CurrentPlay;
  decisions?: GameDecision;
};

export type GameDecision = {
  winner: GamePlayer;
  loser: GamePlayer;
  save?: GamePlayer;
};

export type GamePlayer = {
  id: number;
  avatar?: string;
  fullName: string;
  summary?: string;
  position?: string;
  jerseyNumber?: string | number;
  battingOrder?: string | number;
  game?: TeamStats;
  season?: TeamStats;
};

export type CurrentMatchup = {
  batter: {
    bats: string;
  } & GamePlayer;
  pitcher: {
    throws: string;
  } & GamePlayer;
};

export type CurrentCount = {
  balls: number;
  strikes: number;
  outs: number;
};

export type CurrentPlay = {
  matchup: CurrentMatchup;
  count: CurrentCount;
  events: PlayEvent[];
  runners: {
    first?: GamePlayer;
    second?: GamePlayer;
    third?: GamePlayer;
  };
};
