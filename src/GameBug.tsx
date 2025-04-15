import { FC, ReactNode } from "react";
import { Game } from "./Game";
import cn from "./utils";

export type GameBugProps = {
  className?: string;
  game: Game;
  children?: ReactNode;
};

export const GameBug: FC<GameBugProps> = (props) => {
  const { game, className } = props;

  return (
    <span className={cn("game-bug", className)}>
      <div className="balls-strikes">
        <span className="balls">{game?.currentPlay?.count.balls}</span> &ndash;
        <span className="strikes">{game?.currentPlay?.count.strikes}</span>
      </div>
      <div className="outs">
        {Array.from({ length: 3 }, (_, i) => (
          <span
            className={cn(
              "out",
              (game?.currentPlay?.count.outs || 0) > i && "is-out"
            )}
            key={i}
          >
            {i}
          </span>
        ))}
      </div>
    </span>
  );
};
