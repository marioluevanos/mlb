import { FC, useMemo } from "react";
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
  startingPitcher?: string;
};

export const TeamScore: FC<TeamScoreProps> = (props) => {
  const { score, className, status, startingPitcher } = props;
  const isScheduled = status === "Scheduled";
  const isPregame = status === "Pre-Game";
  const isPostponed = status === "Postponed";

  if (isScheduled || isPregame || isPostponed) {
    return <StartingPitcher startingPitcher={startingPitcher} />;
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

const StartingPitcher: FC<Pick<TeamScoreProps, "startingPitcher">> = (
  props
) => {
  const { startingPitcher } = props;

  const pitcher = useMemo(() => {
    let name = "(TBD)";

    if (startingPitcher) {
      const [first, last] = startingPitcher.split(" ");
      name = `${first.slice(0, 1)}. ${last}`;
    }

    return name;
  }, [startingPitcher]);

  return <span className="starting-pitcher">{pitcher}</span>;
};
