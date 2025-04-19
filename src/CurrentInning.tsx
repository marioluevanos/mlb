import { FC } from "react";
import { cn } from "./utils/cn";
import { GameToday } from "./types";
import { TriangleDown, TriangleUp } from "./Icon";

export type CurrentInningProps = {
  className?: string;
  currentInning: GameToday["currentInning"];
};

export const CurrentInning: FC<CurrentInningProps> = (props) => {
  const { currentInning = "", className } = props;

  const [pos, inning] = currentInning.split(" ");

  return (
    <span className={cn("current-inning", className)}>
      {pos === "TOP" ? <TriangleUp /> : <TriangleDown />}
      {inning}
    </span>
  );
};
