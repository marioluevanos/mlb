import { FC, ReactNode } from "react";
import { GameDecision } from "./types";
import { Player } from "./Player";

export type GameDecisionsProps = {
  className?: string;
  decisions?: GameDecision;
  children?: ReactNode;
};

export const GameDecisions: FC<GameDecisionsProps> = (props) => {
  const { decisions } = props;

  return (
    decisions?.winner && (
      <div className="game-decisions">
        <h3>Decision</h3>
        {decisions.winner && (
          <Player className="winner" player={decisions.winner} />
        )}
        {decisions.loser && (
          <Player className="loser" player={decisions.loser} />
        )}
        {decisions.save?.fullName && (
          <Player className="save" player={decisions.save} />
        )}
      </div>
    )
  );
};
