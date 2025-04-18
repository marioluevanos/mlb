import { FC } from "react";
import { cn } from "./utils/cn";
import { GameStatus, TeamScore as Score } from "./types";

type TeamScoreProps = {
  score?: Score;
  className?: string;
  status: GameStatus;
};

export const TeamScore: FC<TeamScoreProps> = (props) => {
  const { score, className, status } = props;
  const isScheduled = status === "Scheduled";
  const isPregame = status === "Pre-Game";
  const isPostponed = status === "Postponed";
  const isWarmup = status === "Warmup";

  if (isScheduled || isPregame || isPostponed || isWarmup) {
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
