import { FC, useId, useRef, useState } from "react";
import { GameData } from "./Game";
import { cssVars } from "./utils";

type GameHighlightsProps = {
  highlights?: GameData["highlights"];
  title?: string;
};

type Video = GameData["highlights"][number];

export const GameHighlights: FC<GameHighlightsProps> = (props) => {
  const { highlights = [], title } = props;
  const id = useId();
  const [media, setMedia] = useState<Video>(highlights[0]);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return !media ? null : (
    <>
      <div className="game-highlight">
        <h3>{title}</h3>
        <video
          ref={videoRef}
          poster={media.placeholder?.lg?.src}
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
                requestAnimationFrame(() => {
                  if (videoRef.current) {
                    videoRef.current.play();
                  }
                });
              }}
            >
              {media.title}
            </button>
            {media.placeholder.sm?.src ? (
              <img
                src={media.placeholder.sm.src}
                width={media.placeholder.sm.width}
                height={media.placeholder.sm.height}
              />
            ) : (
              <div id="game-placeholder-box"></div>
            )}
            <figcaption>{media.title}</figcaption>
          </figure>
        ))}
      </div>
    </>
  );
};
