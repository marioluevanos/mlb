import { FC } from "react";
import { Game } from "./Game";
import cn from "./utils";

type BoxScoreProps = {
  innings: Game["innings"];
  team: "home" | "away";
};

export const BoxScore: FC<BoxScoreProps> = (props) => {
  const { innings, team } = props;

  return (
    <div className="box-score">
      {team === "away" && (
        <div className="innings title">
          {Array.from({ length: 9 }, (_, i) => (
            <span className="inning-title" key={i} data-num={i + 1} />
          ))}
        </div>
      )}
      <div className="innings">
        {innings.map((inning) => (
          <span
            className="inning"
            key={inning.num}
            data-inning={inning.ordinalNum}
          >
            {team === "away" ? (
              <span className={cn(inning.away.runs > 0 ? "scored" : "")}>
                {inning.away.runs}
              </span>
            ) : (
              <span className={cn(inning.home.runs > 0 ? "scored" : "")}>
                {inning.home.runs}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};
