import { BaseSyntheticEvent, FC, Ref } from "react";
import cn, { isWinner } from "./utils";
import { Team, TeamClub } from "./Team";
import { TeamScore } from "./TeamScore";
import { GameDetails } from "./GameDetails";
import { TopPerformers } from "./TopPerformers";
import { GameStreams } from "./GameStreams";
import { GameHighlights } from "./GameHighlights";
import { BoxScore } from "./BoxScore";
import { GameMatchup } from "./GameMatchup";
import { GameDecisions } from "./GameDecisions";

export type GameStatus =
  | "Final"
  | "Scheduled"
  | "Pre-Game"
  | "Postponed"
  | "In Progress"
  | "Game Over";

export type GameTopPerformers = {
  jerseyNumber: string;
  pos: string;
  summary: string;
} & Player;

export type GameHighlights = {
  type: string;
  title: string;
  description: string;
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

export type GameInnings = {
  away: TeamScore;
  home: TeamScore;
  num: number;
  ordinalNum: string;
};

export type GameData = {
  id: number;
  feed: string;
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
  avatar: string;
  fullName: string;
  summary?: string;
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
};

export type GameProps = {
  className?: string;
  isLoading?: boolean;
  game: GameData;
  onClick?: (event: BaseSyntheticEvent) => void;
  ref?: Ref<HTMLDetailsElement | null> | null;
};

export const Game: FC<GameProps> = (props) => {
  const { game, isLoading, ref, onClick } = props;
  const { away, home } = game;
  const isFinal = game.status === "Final";
  const isPreGame = game.status === "Pre-Game";
  const isPostponed = game.status === "Postponed";
  const isScheduled = game.status === "Scheduled";
  const isPre = isPreGame || isPostponed || isScheduled;
  const winner = isWinner(home, away);

  return (
    <details
      data-status={game.status}
      ref={ref}
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
            <BoxScore innings={game.innings} team="away" />
            <TeamScore
              status={game.status}
              startingPitcher={away.startingPitcher}
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
            <BoxScore innings={game.innings} team="home" />
            <TeamScore
              status={game.status}
              startingPitcher={home.startingPitcher}
              className={cn(isLoading && "loading")}
              score={home.score}
            />
          </Team>
        </span>
        <GameDetails game={game} className={cn(isLoading && "loading")} />
      </summary>
      <footer className="game-footer">
        <GameDecisions decisions={game.decisions} />
        <GameMatchup matchup={game.currentPlay?.matchup} />
        {game.topPerformers.length > 0 && !isPre ? (
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
