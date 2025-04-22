import { FC, ReactNode } from "react";
import { CurrentPlay } from "./types";
import { Player, PlayerProps } from "./Player";
import "./styles/GameMatchup.scss";

export type GameMatchupProps = {
  className?: string;
  currentPlay?: CurrentPlay;
  children?: ReactNode;
  gameId?: number;
  onPlayerClick?: PlayerProps["onClick"];
};

export const GameMatchup: FC<GameMatchupProps> = (props) => {
  const { currentPlay, children, onPlayerClick } = props;
  const matchup = currentPlay?.matchup;
  return (
    matchup && (
      <section className="game-matchup">
        <h3>Current Matchup</h3>
        <div className="current-matchup">
          <Player player={matchup.batter} onClick={onPlayerClick} />
          <Player player={matchup.pitcher} onClick={onPlayerClick} />
        </div>
        {children}
      </section>
    )
  );
};
