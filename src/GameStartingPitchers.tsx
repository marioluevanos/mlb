import { FC } from "react";
import { GamePlayer } from "./types";
import { Player, PlayerProps } from "./Player";
import "./styles/GameStartingPitchers.scss";

type GameStartingPitchersProps = {
  home?: GamePlayer;
  away?: GamePlayer;
  onPlayerClick?: PlayerProps["onClick"];
};

export const GameStartingPitchers: FC<GameStartingPitchersProps> = (props) => {
  const { home, away, onPlayerClick } = props;
  return (
    <div className="game-starting-pitchers">
      <h3>Probable Pitchers</h3>
      <Player
        className="starting-pitcher"
        player={away}
        onClick={onPlayerClick}
      />
      <span className="vs">vs</span>
      <Player
        className="starting-pitcher"
        player={home}
        onClick={onPlayerClick}
      />
    </div>
  );
};
