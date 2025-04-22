import { BaseSyntheticEvent, FC } from "react";
import { cn } from "./utils/cn";
import { GamePlayer } from "./types";
import "./styles/BoxPlayer.scss";

export type BoxPlayerProps = {
  player?: GamePlayer;
  className?: string;
  onPlayerClick?: (event: BaseSyntheticEvent) => void;
};

export const BoxPlayer: FC<BoxPlayerProps> = (props) => {
  const { className, player, onPlayerClick } = props;

  return (
    player && (
      <div className={cn("box-player", className)}>
        <header>
          <img src={player.avatar} />
          <div className="text">
            <h3>{player.fullName}</h3>
            <p>Position: {player.position}</p>
            <p>#{player.jerseyNumber}</p>
          </div>
        </header>

        <section className="box-player-section">
          <h3>Season Batting</h3>
          <div className={cn("box-row labels")}>
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
          </div>
          <div
            key={player.id}
            data-player-id={player.id}
            onClick={onPlayerClick}
            className={cn("box-row players")}
          >
            {player.season?.batting && (
              <span className="box-stats">
                <span>{player.season.batting.atBats}</span>
                <span>{player.season.batting.runs}</span>
                <span>{player.season.batting.hits}</span>
                <span>{player.season.batting.rbi}</span>
                <span>{player.season.batting.baseOnBalls}</span>
                <span>{player.season.batting.strikeOuts}</span>
                <span>{player.season?.batting.avg.slice(0, 4)}</span>
                <span>{player.season?.batting.ops.slice(0, 4)}</span>
              </span>
            )}
          </div>
        </section>

        <section className="box-player-section">
          <h3>Season Pitching</h3>
          <div className={cn("box-row labels")}>
            <span className="box-stats">
              <span className="box-stats">
                <span>IP</span>
                <span>H</span>
                <span>R</span>
                <span>ER</span>
                <span>BB</span>
                <span>SO</span>
                <span>ERA</span>
                <span>WHIP</span>
              </span>
            </span>
          </div>
          <div
            key={player.id}
            data-player-id={player.id}
            onClick={onPlayerClick}
            className={cn("box-row players")}
          >
            {player.season?.pitching && (
              <span className="box-stats">
                <span>{player.season.pitching.inningsPitched}</span>
                <span>{player.season.pitching.hits}</span>
                <span>{player.season.pitching.runs}</span>
                <span>{player.season.pitching.earnedRuns}</span>
                <span>{player.season.pitching.baseOnBalls}</span>
                <span>{player.season.pitching.strikeOuts}</span>
                <span>{player.season?.pitching.era}</span>
                <span>{player.season?.pitching.whip}</span>
              </span>
            )}
          </div>
        </section>
      </div>
    )
  );
};
