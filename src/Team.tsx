import { FC, ReactNode } from "react";
import { cn } from "./utils/cn";
import { TeamClub } from "./types";

export type TeamProps = {
  className?: string;
  children?: ReactNode;
  team: TeamClub;
};

export const Team: FC<TeamProps> = (props) => {
  const { children, team, className } = props;

  return (
    <span className="team">
      <span className={cn("team-logo", className)}>
        {team.logo && <img src={team.logo} />}
      </span>
      <span className={cn("team-name", className)}>{team.abbreviation}</span>
      <span className={cn("team-record", className)}>
        ({team.record.wins} &ndash; {team.record.losses})
      </span>
      {children}
    </span>
  );
};
