import { FC, ReactNode } from "react";
import { CurrentPlay } from "./types";
import { Player } from "./Player";

export type GameMatchupProps = {
  className?: string;
  currentPlay?: CurrentPlay;
  children?: ReactNode;
  gameId?: number;
};

export const GameMatchup: FC<GameMatchupProps> = (props) => {
  const { currentPlay, children } = props;
  const matchup = currentPlay?.matchup;
  return (
    matchup && (
      <div className="game-matchup">
        <h3>Current Matchup</h3>
        <div className="current-matchup">
          <Player player={matchup.batter} />
          <Player player={matchup.pitcher} />
        </div>
        {children}
      </div>
    )
  );
};
