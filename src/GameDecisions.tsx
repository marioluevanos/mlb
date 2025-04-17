import { FC, ReactNode } from "react";
import { GameDecision } from "./Game";

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
          <span className="winner player">
            <span className="player-summary">{decisions.winner?.summary}</span>
            <img className="player-avatar" src={decisions.winner?.avatar} />
            <span data-pos="Winner" className="player-name">
              {decisions.winner.fullName}
            </span>
          </span>
        )}
        {decisions.loser && (
          <span className="loser player">
            <span className="player-summary">{decisions.loser?.summary}</span>
            <img className="player-avatar" src={decisions.loser?.avatar} />
            <span data-pos="Loser" className="player-name">
              {decisions.loser.fullName}
            </span>
          </span>
        )}
        {decisions.save?.fullName && (
          <span className="save player">
            <span className="player-summary">{decisions?.save?.summary}</span>
            <img className="player-avatar" src={decisions?.save?.avatar} />
            <span data-pos="Save" className="player-name">
              {decisions.save?.fullName}
            </span>
          </span>
        )}
      </div>
    )
  );
};
