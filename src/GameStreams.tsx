import { FC } from "react";
import { GameStream } from "./types";
import "./styles/GameStreams.scss";

type GameStreamsProps = {
  streams?: GameStream[];
};

export const GameStreams: FC<GameStreamsProps> = (props) => {
  const { streams = [] } = props;

  return (
    <div className="game-streams">
      <h3>Game Links</h3>
      {/* <iframe src={streams[0].url} seamless={true} allow="fullscreen" /> */}

      {streams?.map((link) => (
        <a
          key={link.name}
          className="game-link"
          href={link.url}
          target="_blank"
          rel="noopener"
        >
          {link.name}
        </a>
      ))}
    </div>
  );
};
