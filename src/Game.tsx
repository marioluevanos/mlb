import { FC } from "react";
import cn, { isWinner } from "./utils";
import { Team, TeamClub } from "./Team";
import { TeamScore } from "./TeamScore";
import { GameDetails } from "./GameDetails";
import { TopPerformers } from "./TopPerformers";
import { GameStreams } from "./GameStreams";
import { GameHighlights } from "./GameHighlights";
import { BoxScore } from "./BoxScore";

export type GameStatus = "Final" | "Scheduled" | "Pre-Game" | "Postponed";

export type GameTopPerformers = {
  avatar: string;
  jerseyNumber: string;
  id: number;
  name: string;
  pos: string;
  summary: string;
};

export type GameHighlights = {
  type: string;
  title: string;
  description: string;
  placeholder: {
    src: string;
    width: number;
    height: number;
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

export type Game = {
  id: number;
  status: GameStatus;
  away: TeamClub;
  home: TeamClub;
  time: string;
  currentInning: string;
  topPerformers: GameTopPerformers[];
  highlights: GameHighlights[];
  streams: GameStream[];
  innings: GameInnings[];
};

export type GameProps = {
  className?: string;
  isLoading?: boolean;
  game: Game;
};

export const Game: FC<GameProps> = (props) => {
  const { game, isLoading } = props;
  const { away, home } = game;
  const isFinal = game.status === "Final";
  const winner = isWinner(home, away);

  return (
    <details>
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
        <GameHighlights highlights={game.highlights} />
        {game.topPerformers.length > 0 ? (
          <TopPerformers players={game.topPerformers} />
        ) : null}
        {!isFinal && <GameStreams streams={game.streams} />}
      </footer>
    </details>
  );
};
