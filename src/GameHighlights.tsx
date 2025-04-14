import { FC, useId, useState } from "react";
import { Game } from "./Game";
import { cssVars } from "./utils";

type GameHighlightsProps = {
  highlights?: Game["highlights"];
};

type Video = Game["highlights"][number];

export const GameHighlights: FC<GameHighlightsProps> = (props) => {
  const { highlights = [] } = props;
  const id = useId();
  const [media, setMedia] = useState<Video>(highlights[0]);

  return !media ? null : (
    <>
      <h3>Highlights</h3>
      <div className="game-highlight">
        <video
          poster={media.placeholder.src}
          controls
          src={media.video.url}
        ></video>
        <h4>{media.title}</h4>
        <p>{media.description}</p>
      </div>
      <div
        className="game-highlights"
        style={cssVars({
          "--highlights-total": highlights?.length || 0,
        })}
      >
        {highlights?.map((media, i) => (
          <figure className="game-highlight" key={id + i}>
            <button
              className="game-highlight-btn"
              title={media.title}
              onClick={() => {
                setMedia(media);
              }}
            >
              {media.title}
            </button>
            <img
              src={media.placeholder.src}
              width={media.placeholder.width}
              height={media.placeholder.height}
            />
            <figcaption>{media.title}</figcaption>
          </figure>
        ))}
      </div>
    </>
  );
};
