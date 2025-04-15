import { FC } from "react";
import cn from "./utils";
import { GameStatus } from "./Game";

export type TeamScore = {
  runs: number;
  hits: number;
  errors: number;
  leftOnBase: number;
};

type TeamScoreProps = {
  score?: TeamScore;
  className?: string;
  status: GameStatus;
};

export const TeamScore: FC<TeamScoreProps> = (props) => {
  const { score, className, status } = props;
  const isScheduled = status === "Scheduled";
  const isPregame = status === "Pre-Game";
  const isPostponed = status === "Postponed";

  if (isScheduled || isPregame || isPostponed) {
    return null;
  }

  if (!score) return null;

  return (
    <span className={cn("team-score")}>
      <span className={className}>{score.runs}</span>
      <span className={className}>{score.hits}</span>
      <span className={className}>{score.errors}</span>
    </span>
  );
};
