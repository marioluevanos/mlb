import { FC, ReactNode } from "react";
import { GameToday } from "./Game";
import cn from "./utils";

export type GameBugProps = {
  className?: string;
  game: GameToday;
  children?: ReactNode;
};

export const GameBug: FC<GameBugProps> = (props) => {
  const { game, className } = props;
  const runners = game.currentPlay?.runners;
  return (
    <span className={cn("game-bug", className)}>
      <span className="bases">
        <span className={cn("base second", runners?.second && "runner")}></span>
        <span className={cn("base first", runners?.first && "runner")}></span>
        <span className={cn("base third", runners?.third && "runner")}></span>
        <span className="base home"></span>
      </span>
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
