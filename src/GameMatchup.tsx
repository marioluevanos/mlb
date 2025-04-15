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
          <img className="avatar" src={matchup.batter.avatar} />
          {matchup.batter.fullName}
        </span>
        <span className="pitcher player">
          <img className="avatar" src={matchup.pitcher.avatar} />
          <span>({matchup.pitcher.throws}HP)</span>
          {matchup.pitcher.fullName}
        </span>
      </div>
    )
  );
};
