import { FC } from "react";
import cn, { isWinner } from "./utils";
import { Team, TeamClub } from "./Team";
import { TeamScore } from "./TeamScore";
import { GameDetails } from "./GameDetails";
import { TopPerformers } from "./TopPerformers";
import { GameStreams } from "./GameStreams";
import { GameHighlights } from "./GameHighlights";

export type GameStatus = "Final" | "Scheduled" | "Pre-Game" | "Postponed";

export type GameTopPerformers = {
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
};

export type GameProps = {
  className?: string;
  game: Game & { isLoading?: boolean };
};

export const Game: FC<GameProps> = (props) => {
  const { game } = props;
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
              game.isLoading && "loading",
              winner === "away" && "winner"
            )}
          >
            <TeamScore
              status={game.status}
              startingPitcher={away.startingPitcher}
              className={cn(game.isLoading && "loading")}
              score={away.score}
            />
          </Team>
          <Team
            team={home}
            className={cn(
              game.isLoading && "loading",
              winner === "home" && "winner"
            )}
          >
            <TeamScore
              status={game.status}
              startingPitcher={home.startingPitcher}
              className={cn(game.isLoading && "loading")}
              score={home.score}
            />
          </Team>
        </span>
        <GameDetails game={game} className={cn(game.isLoading && "loading")} />
      </summary>
      <footer className="game-footer">
        <GameHighlights highlights={game.highlights} />
        {game.topPerformers.length > 0 ? (
          <TopPerformers players={game.topPerformers} />
        ) : (
          <GameStreams streams={game.streams} />
        )}
      </footer>
    </details>
  );
};
