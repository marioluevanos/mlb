import { FC, ReactNode } from "react";
import { TeamClub } from "./Team";
import { cn } from "./utils/cn";

type BoxPlayersProps = {
  title?: string;
  stats?: TeamClub["stats"];
  className?: string;
  position: "Batting" | "Pitching";
  header?: ReactNode;
};

export const BoxPlayers: FC<BoxPlayersProps> = (props) => {
  const { header, className, stats, title, position } = props;
  const firstName = (name: string) => {
    const [first, last] = name.split(" ");
    return `${first.slice(0, 1)}. ${last}`;
  };

  return (
    stats?.players && (
      <div className={cn("box-players", className)}>
        <h3>{title}</h3>
        {header}
        <div className="box-row labels">
          <span className="box-name">Lineup</span>
          {position === "Batting" ? (
            <span className="box-stats">
              <span>AB</span>
              <span>R</span>
              <span>H</span>
              <span>RBI</span>
              <span>BB</span>
              <span>SO</span>
              <span>AVG</span>
              <span>OPS</span>
            </span>
          ) : (
            <span className="box-stats">
              <span>IP</span>
              <span>H</span>
              <span>R</span>
              <span>ER</span>
              <span>BB</span>
              <span>SO</span>
              <span>HR</span>
              <span>WHIP</span>
            </span>
          )}
        </div>
        {stats.players.map((player) => (
          <div key={player.id} className="box-row players">
            <span className="box-name" data-pos={player.position}>
              {firstName(player.fullName)}
            </span>
            {position === "Batting" ? (
              <span className="box-stats">
                <span>{player.game.batting?.atBats}</span>
                <span>{player.game.batting?.runs}</span>
                <span>{player.game.batting?.hits}</span>
                <span>{player.game.batting?.rbi}</span>
                <span>{player.game.batting?.baseOnBalls}</span>
                <span>{player.game.batting?.strikeOuts}</span>
                <span>{player.season.batting?.avg.slice(0, 4)}</span>
                <span>{player.season.batting?.ops.slice(0, 4)}</span>
              </span>
            ) : (
              <span className="box-stats">
                <span>{player.game.pitching?.inningsPitched}</span>
                <span>{player.game.pitching?.hits}</span>
                <span>{player.game.pitching?.runs}</span>
                <span>{player.game.pitching?.earnedRuns}</span>
                <span>{player.game.pitching?.baseOnBalls}</span>
                <span>{player.game.pitching?.strikeOuts}</span>
                <span>{player.season.pitching?.homeRuns}</span>
                <span>{player.season.pitching?.whip}</span>
              </span>
            )}
          </div>
        ))}
      </div>
    )
  );
};
