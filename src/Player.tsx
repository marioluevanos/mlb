import { BaseSyntheticEvent, FC } from "react";
import { cn } from "./utils/cn";
import { GamePlayer } from "./types";
import "./styles/Player.scss";

export type PlayerProps = {
  className?: string;
  onClick?: (event: BaseSyntheticEvent) => void;
  player?: Pick<
    GamePlayer,
    | "avatar"
    | "id"
    | "fullName"
    | "jerseyNumber"
    | "position"
    | "summary"
    | "note"
  >;
};

export const Player: FC<PlayerProps> = (props) => {
  const { className, player, onClick } = props;
  const fullName = player?.fullName;
  const summary = player?.summary;
  const position = player?.position;
  const avatar = player?.avatar;
  const note = player?.note;

  return (
    player && (
      <div
        className={cn("player", className)}
        data-id={player.id}
        onClick={onClick}
      >
        <img className="player-avatar" src={avatar} />
        <span data-pos={position} className="player-name">
          {fullName}
        </span>
        {(summary || note) && (
          <span className="player-summary">{summary || note}</span>
        )}
        {note && <span className="player-note">{note}</span>}
      </div>
    )
  );
};
