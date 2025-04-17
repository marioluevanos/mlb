import { FC, ReactNode } from "react";
import { cn } from "./utils/cn";
import { Player, TeamScore } from "./Game";
import { BattingRecord, FieldingRecord, PitchingRecord } from "./mlb.types";

export type TeamRecord = {
  wins: number;
  losses: number;
  pct: string;
};

export type AllStats = {
  batting?: BattingRecord;
  pitching?: PitchingRecord;
  fielding?: FieldingRecord;
};

export type TeamClub = {
  record: TeamRecord;
  name: string;
  startingPitcher: Player;
  score: TeamScore;
  abbreviation: string;
  logo: string;
  id: number;
  stats?: {
    players: (Player & { game: AllStats; season: AllStats })[];
    team: AllStats;
  };
};

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
