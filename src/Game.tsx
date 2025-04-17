import { BaseSyntheticEvent, FC, Ref } from "react";
import { Team, TeamClub } from "./Team";
import { TeamScore } from "./TeamScore";
import { GameDetails } from "./GameDetails";
import { TopPerformers } from "./TopPerformers";
import { GameStreams } from "./GameStreams";
import { GameHighlights } from "./GameHighlights";
import { BoxScore } from "./BoxScore";
import { GameMatchup } from "./GameMatchup";
import { GameDecisions } from "./GameDecisions";
import { GameStartingPitchers } from "./GameStartingPitchers";
import { GameBug } from "./GameBug";
import { PlayEvent, PlayEvents } from "./PlayEvents";
import { BoxPlayers } from "./BoxPlayers";
import { isWinner } from "./utils/isWinner";
import { cn } from "./utils/cn";

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

export type GameTopPerformers = {
  jerseyNumber: string;
  pos: string;
  summary: string;
} & Player;

export type GameHighlights = {
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
  topPerformers: GameTopPerformers[];
  highlights: GameHighlights[];
  streams: GameStream[];
  innings: GameInnings[];
  currentPlay?: CurrentPlay;
  decisions?: GameDecision;
};

export type GameDecision = {
  winner: Player;
  loser: Player;
  save?: Player;
};

export type Player = {
  id: number;
  avatar?: string;
  fullName: string;
  summary?: string;
  position?: string;
};

export type CurrentMatchup = {
  batter: {
    bats: string;
  } & Player;
  pitcher: {
    throws: string;
  } & Player;
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
    first?: Player;
    second?: Player;
    third?: Player;
  };
};

export type GameProps = {
  className?: string;
  isLoading?: boolean;
  game: GameToday;
  onClick?: (event: BaseSyntheticEvent) => void;
  ref?: Ref<HTMLDetailsElement | null> | null;
};

export const Game: FC<GameProps> = (props) => {
  const { game, isLoading, ref, onClick } = props;
  const { away, home } = game;
  const isFinal = game.status === "Final" || game.status === "Game Over";
  const isPreGame = game.status === "Pre-Game";
  const isPostponed = game.status === "Postponed";
  const isScheduled = game.status === "Scheduled";
  const inProgress = game.status === "In Progress";
  const isWarmup = game.status === "Warmup";
  const isPre = isPreGame || isScheduled || isWarmup;
  const winner = isWinner(home, away);

  return (
    <details
      ref={ref}
      data-status={game.status}
      id={game.id.toString()}
      onClick={onClick}
    >
      <summary className={cn(isFinal && "final")}>
        <span className="teams">
          <Team
            team={away}
            className={cn(
              isLoading && "loading",
              winner === "away" && "winner"
            )}
          >
            <BoxScore
              innings={game.innings}
              team="away"
              className={cn(game.currentInning, "away")}
            />
            <TeamScore
              status={game.status}
              className={cn(isLoading && "loading")}
              score={away.score}
            />
          </Team>
          <Team
            team={home}
            className={cn(
              isLoading && "loading",
              winner === "home" && "winner"
            )}
          >
            <BoxScore
              innings={game.innings}
              team="home"
              className={cn(game.currentInning, "home")}
            />
            <TeamScore
              status={game.status}
              className={cn(isLoading && "loading")}
              score={home.score}
            />
          </Team>
        </span>
        <GameDetails game={game} className={cn(isLoading && "loading")} />
      </summary>
      <footer className="game-footer">
        {isPre && (
          <GameStartingPitchers
            home={home.startingPitcher}
            away={away.startingPitcher}
          />
        )}
        <GameDecisions decisions={game.decisions} />
        {inProgress && (
          <GameMatchup
            key={
              game.currentPlay?.matchup.pitcher.summary +
              `${game.currentPlay?.matchup.batter.summary}`
            }
            gameId={game.id}
            currentPlay={game.currentPlay}
          >
            <GameBug
              currentPlay={game.currentPlay}
              currentInning={game.currentInning}
            />
          </GameMatchup>
        )}
        <BoxPlayers
          title="Batting"
          team={game.away.abbreviation}
          stats={game.away.stats}
        />
        <BoxPlayers
          title="Batting"
          team={game.home.abbreviation}
          stats={game.home.stats}
        />
        {/* <BoxPlayers
          title="Pitching"
          team={game.away.abbreviation}
          stats={game.away.stats}
        />
        <BoxPlayers
          title="Pitching"
          team={game.home.abbreviation}
          stats={game.home.stats}
        /> */}
        {!isFinal && <PlayEvents events={game.currentPlay?.events} />}
        {game.topPerformers.length > 0 && !isPre && !isPostponed ? (
          <TopPerformers players={game.topPerformers} />
        ) : null}
        <GameHighlights
          title={isPre ? "Preview" : "Highlights"}
          highlights={game.highlights}
        />
        {!isFinal && <GameStreams streams={game.streams} />}
      </footer>
    </details>
  );
};
