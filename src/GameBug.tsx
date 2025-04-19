import { FC, ReactNode } from "react";
import { CurrentPlay } from "./types";
import { cn } from "./utils/cn";
import { CurrentInning } from "./CurrentInning";

export type GameBugProps = {
  className?: string;
  currentPlay?: CurrentPlay;
  children?: ReactNode;
  currentInning?: string;
};

export const GameBug: FC<GameBugProps> = (props) => {
  const { currentPlay, currentInning, className } = props;
  const runners = currentPlay?.runners;

  return (
    <span className={cn("game-bug", className)}>
      <span className="bases">
        <span className={cn("base second", runners?.second && "runner")}></span>
        <span className={cn("base first", runners?.first && "runner")}></span>
        <span className={cn("base third", runners?.third && "runner")}></span>
        <span className="base home"></span>
      </span>
      <div className="balls-strikes">
        <span className="balls">{currentPlay?.count.balls}</span> &ndash;
        <span className="strikes">{currentPlay?.count.strikes}</span>
      </div>
      <div className="outs">
        {Array.from({ length: 3 }, (_, i) => (
          <span
            className={cn(
              "out",
              (currentPlay?.count.outs || 0) > i && "is-out"
            )}
            key={i}
          >
            {i}
          </span>
        ))}
      </div>
      {currentInning && <CurrentInning currentInning={currentInning} />}
    </span>
  );
};
