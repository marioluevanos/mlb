import { FC, ReactNode, useCallback, useMemo } from "react";
import { cn } from "./utils/cn";
import { GamePlayer } from "./types";
import { GameBoxScoreProps } from "./GameBoxScore";
import "./styles/BoxPlayers.scss";

type BoxPlayersProps = {
  title?: string;
  players?: GamePlayer[];
  className?: string;
  position: "Batting" | "Pitching";
  header?: ReactNode;
  matchup?: GameBoxScoreProps["matchup"];
};

export const BoxPlayers: FC<BoxPlayersProps> = (props) => {
  const { matchup, header, className, players = [], title, position } = props;

  /**
   * Modified player name
   */
  const firstName = (name: string) => {
    const [_, last] = name.split(" ");
    return `${last}`;
  };

  /**
   * Get the batting order
   */
  const getBattingOrder = useCallback((players: GamePlayer[]) => {
    return players
      .reduce<GamePlayer[]>((acc, p) => {
        if (typeof p.battingOrder === "number") {
          acc.push(p);
        }
        return acc;
      }, [])
      .sort((a, b) => {
        if (Number(a.battingOrder) > Number(b.battingOrder)) {
          return 1;
        }
        if (Number(a.battingOrder) < Number(b.battingOrder)) {
          return -1;
        }
        return 0;
      });
  }, []);

  /**
   * Get the pitching order
   */
  const getPitchingOrder = useCallback((players: GamePlayer[]) => {
    return players.reduce<GamePlayer[]>((acc, p) => {
      if (p.position === "P" && Object.values(p.game?.pitching || {}).length) {
        acc.unshift(p);
      }
      return acc;
    }, []);
  }, []);

  /**
   * Pinch hitter class
   */
  const ph = (bo?: number | string) => (Number(bo) % 100 > 0 ? "ph" : "");

  /**
   * Get Batters or Pitchers
   */
  const currentPlayers = useMemo(() => {
    return position === "Batting"
      ? getBattingOrder(players)
      : getPitchingOrder(players);
  }, [position, players]);

  return players.length > 0 ? (
    <div className={cn("box-players", className)}>
      {header}
      <div className={cn("box-row labels", position.toLowerCase())}>
        <span className="box-name">{title}</span>
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
            <span>ERA</span>
            <span>WHIP</span>
          </span>
        )}
      </div>
      {currentPlayers.map((player) => (
        <div
          key={player.id}
          data-player-id={player.id}
          className={cn(
            "box-row players",
            matchup?.batterId === player.id && "active",
            matchup?.pitcherId === player.id && "active",
            position.toLowerCase(),
            ph(player.battingOrder)
          )}
        >
          <span className="box-name" data-pos={player.position}>
            {firstName(player.fullName)}
          </span>
          {player.game &&
            (position === "Batting" ? (
              <span className="box-stats">
                <span>{player.game.batting?.atBats}</span>
                <span>{player.game.batting?.runs}</span>
                <span>{player.game.batting?.hits}</span>
                <span>{player.game.batting?.rbi}</span>
                <span>{player.game.batting?.baseOnBalls}</span>
                <span>{player.game.batting?.strikeOuts}</span>
                <span>{player.season?.batting?.avg.slice(0, 4)}</span>
                <span>{player.season?.batting?.ops.slice(0, 4)}</span>
              </span>
            ) : (
              <span className="box-stats">
                <span>{player.game.pitching?.inningsPitched}</span>
                <span>{player.game.pitching?.hits}</span>
                <span>{player.game.pitching?.runs}</span>
                <span>{player.game.pitching?.earnedRuns}</span>
                <span>{player.game.pitching?.baseOnBalls}</span>
                <span>{player.game.pitching?.strikeOuts}</span>
                <span>{player.season?.pitching?.era}</span>
                <span>{player.season?.pitching?.whip}</span>
              </span>
            ))}
        </div>
      ))}
    </div>
  ) : null;
};
