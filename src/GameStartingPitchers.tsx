import { FC } from "react";
import { GamePlayer } from "./types";
import { Player } from "./Player";
import "./styles/GameStartingPitchers.scss";

type GameStartingPitchersProps = {
  home: GamePlayer;
  away: GamePlayer;
};

export const GameStartingPitchers: FC<GameStartingPitchersProps> = (props) => {
  const { home, away } = props;
  return (
    <div className="game-starting-pitchers">
      <h3>Probable Pitchers</h3>
      <Player className="starting-pitcher" player={away} />
      <span className="vs">vs</span>
      <Player className="starting-pitcher" player={home} />
    </div>
  );
};
