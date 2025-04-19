import { FC } from "react";
import { cn } from "../utils/cn";
import { GamePlayer } from "../types";
import "./Player.scss";

type PlayerProps = {
  className?: string;
  player?: GamePlayer;
};

export const Player: FC<PlayerProps> = (props) => {
  const { className, player } = props;
  const isPitcher = player?.position === "P";
  const pos = isPitcher ? "pitching" : "batting";
  const game = player?.game;
  const gameStats = game && game[pos];
  const summary = gameStats?.summary || player?.summary;
  const batting = player?.season?.batting;
  const pitching = player?.season?.pitching;
  const hasNote = gameStats && "note" in gameStats && gameStats.note;
  const note = hasNote
    ? gameStats.note
    : isPitcher
    ? `${pitching?.era} ERA`
    : batting && `${batting?.avg} AVG, ${batting?.ops} OPS`;

  return (
    player && (
      <div className={cn("player", className)}>
        <img className="player-avatar" src={player?.avatar} />
        <span data-pos={player.position} className="player-name">
          {player.fullName}
        </span>
        <span className="player-summary">{summary}</span>
        <span className="player-note">{note}</span>
      </div>
    )
  );
};
