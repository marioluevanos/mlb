import { FC } from "react";
import { GameTopPerformers } from "./Game";

type TopPerformersProps = {
  players?: GameTopPerformers[];
};

export const TopPerformers: FC<TopPerformersProps> = (props) => {
  const { players } = props;

  return (
    <>
      <div className="top-performers">
        <h3>Top performers</h3>
        {players?.map((player) => (
          <div className="player top-performer" key={player.fullName}>
            <img
              className="player-avatar"
              src={player.avatar}
              width={120}
              height={120}
            />
            <p className="player-name" data-pos={player.pos}>
              {player.fullName}
            </p>
            <p className="player-summary">{player.summary}</p>
          </div>
        ))}
      </div>
    </>
  );
};
