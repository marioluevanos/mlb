import { FC } from "react";
import { Game } from "./Game";

type GameStreamsProps = {
  streams?: Game["streams"];
};

export const GameStreams: FC<GameStreamsProps> = (props) => {
  const { streams } = props;

  return (
    <div className="game-streams">
      <h3>Watch Game</h3>
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
