import { FC } from "react";
import cn from "./utils";
import { GameBug } from "./GameBug";
import { GameToday } from "./Game";
import { TriangleDown, TriangleUp } from "./Icon";

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
        <span className={cn("game-status", className)}>{game.status}</span>
        {isExtraInnings && (
          <span className={cn("total-innings", className)}>
            /{totalInnings}
          </span>
        )}
      </span>
    );
  }

  const [pos] = (game.currentInning || "").split(" ");

  return (
    <span className="game-details">
      <span className={cn("current-inning", className)}>
        {pos === "TOP" ? <TriangleUp /> : <TriangleDown />}
        {totalInnings}
      </span>
      <GameBug game={game} />
    </span>
  );
};
