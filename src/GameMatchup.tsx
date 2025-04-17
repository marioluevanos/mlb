import { FC, ReactNode } from "react";
import { CurrentPlay } from "./Game";

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
          <span className="batter player">
            <img className="player-avatar" src={matchup.batter.avatar} />
            <span className="player-name" data-pos={`B/${matchup.batter.bats}`}>
              {matchup.batter.fullName}
            </span>
            <span className="player-summary">{matchup.batter.summary}</span>
          </span>
          <span className="pitcher player">
            <img className="player-avatar" src={matchup.pitcher.avatar} />
            <span
              className="player-name"
              data-pos={`${matchup.pitcher.throws}HP`}
            >
              {matchup.pitcher.fullName}
            </span>
            <span className="player-summary">{matchup.pitcher.summary}</span>
          </span>
        </div>
        {children}
      </div>
    )
  );
};
