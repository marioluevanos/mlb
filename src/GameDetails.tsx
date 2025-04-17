import { FC } from "react";
import cn from "./utils";
import { GameToday } from "./Game";
import { CurrentInning } from "./CurrentInning";

export type GameDetailProps = {
  className?: string;
  game: GameToday;
};

export const GameDetails: FC<GameDetailProps> = (props) => {
  const { game, className } = props;
  const isFinal = game.status === "Final" || game.status === "Game Over";
  const isScheduled = game.status === "Scheduled";
  const isPregame = game.status === "Pre-Game";
  const isPostponed = game.status === "Postponed";
  const isWarmup = game.status === "Warmup";

  if (isPregame || isScheduled || isWarmup) {
    return (
      <span className="game-details">
        <span className={cn("game-time", className)}>{game.time}</span>
      </span>
    );
  }

  const totalInnings = parseInt(game.currentInning?.replace(/\D+/g, ""));
  if (isFinal || isPostponed) {
    const isExtraInnings = totalInnings > 9;
    return (
      <span className="game-details">
        <span className={cn("game-status", className)}>
          {isFinal ? "Final" : game.status}
        </span>
        {isExtraInnings && (
          <span className={cn("total-innings", className)}>
            /{totalInnings}
          </span>
        )}
      </span>
    );
  }

  return (
    <span className="game-details">
      <CurrentInning currentInning={game.currentInning} />
    </span>
  );
};
