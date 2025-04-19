import { FC } from "react";
import { GamePlayer } from "./types";
import { Player } from "./Player";

type TopPerformersProps = {
  players?: GamePlayer[];
};

export const TopPerformers: FC<TopPerformersProps> = (props) => {
  const { players } = props;
  return (
    <div className="top-performers">
      <h3>Top Performers</h3>
      {players?.map((player) => (
        <Player player={player} key={player.fullName} />
      ))}
    </div>
  );
};
