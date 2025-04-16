import { FC, ReactNode } from "react";
import { CurrentMatchup } from "./Game";

export type GameMatchupProps = {
  className?: string;
  matchup?: CurrentMatchup;
  children?: ReactNode;
};

export const GameMatchup: FC<GameMatchupProps> = (props) => {
  const { matchup } = props;

  return (
    matchup && (
      <div className="game-matchup">
        <h3>Current Matchup</h3>
        <span className="batter player">
          <img className="player-avatar" src={matchup.batter.avatar} />
          <span className="player-name">{matchup.batter.fullName}</span>
        </span>
        <span className="pitcher player">
          <img className="player-avatar" src={matchup.pitcher.avatar} />
          <span>({matchup.pitcher.throws}HP)</span>
          <span className="player-name">{matchup.pitcher.fullName}</span>
        </span>
      </div>
    )
  );
};
