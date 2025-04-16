import { FC } from "react";
import { GameInnings } from "./Game";
import cn from "./utils";

type BoxScoreProps = {
  innings: GameInnings[];
  team: "home" | "away";
};

export const BoxScore: FC<BoxScoreProps> = (props) => {
  const { innings, team } = props;
  const totalInnings = Math.max(9, innings.length);

  return (
    <div className="box-score">
      {team === "away" && (
        <div className="innings title">
          {Array.from({ length: totalInnings }, (_, i) => (
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
              <span className={cn((inning.away.runs || 0) > 0 ? "scored" : "")}>
                {inning.away.runs}
              </span>
            ) : (
              <span className={cn((inning.home.runs || 0) > 0 ? "scored" : "")}>
                {inning.home.runs}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};
