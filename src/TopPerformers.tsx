import { FC } from "react";
import { Game } from "./Game";

type TopPerformersProps = {
  players?: Game["topPerformers"];
};

export const TopPerformers: FC<TopPerformersProps> = (props) => {
  const { players } = props;

  return (
    <>
      <div className="top-performers">
        <h3>Top performers</h3>
        {players?.map((player) => (
          <div className="top-performer" key={player.name}>
            <p className="player-name" data-pos={player.pos}>
              {player.name}
            </p>
            <p className="player-summary">{player.summary}</p>
          </div>
        ))}
      </div>
    </>
  );
};
