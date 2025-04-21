import { FC, useEffect, useId, useRef, useState } from "react";
import { cssVars } from "./utils/cssVars";
import { GameHighlight } from "./types";
import "./styles/GameHighlights.scss";
import { cn } from "./utils/cn";

type GameHighlightsProps = {
  highlights?: GameHighlight[];
  title?: string;
  onFullscreenChange?: () => void;
};

export const GameHighlights: FC<GameHighlightsProps> = (props) => {
  const {
    highlights = [],
    title,
    onFullscreenChange = () => undefined,
  } = props;
  const id = useId();
  const [media, setMedia] = useState<GameHighlight>(highlights[0]);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  /**
   *
   */
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("fullscreenchange", onFullscreenChange);
    }
  }, []);

  return !media ? null : (
    <section className="game-highlight">
      <h3>
        {title} <span>({highlights.length})</span>
      </h3>
      <div className="current-game-highlight">
        <video
          ref={videoRef}
          poster={media.placeholder?.lg?.src}
          controls
          src={media.video.url}
        ></video>
        <h4>{media.title}</h4>
        {media.description && <p>{media.description}</p>}
      </div>

      <div
        className="game-highlights vertical"
        style={cssVars({
          "--highlights-total": highlights?.length || 0,
        })}
      >
        {highlights?.map((highlight, i) => (
          <figure className="game-highlight-item" key={id + i}>
            <button
              className={cn(
                "game-highlight-btn",
                highlight.title === media.title && "active"
              )}
              title={highlight.title}
              onClick={() => {
                setMedia(highlight);
                requestAnimationFrame(() => {
                  if (videoRef.current) {
                    videoRef.current.play();
                  }
                });
              }}
            >
              {highlight.title}
            </button>
            {highlight.placeholder.sm?.src ? (
              <img
                src={highlight.placeholder.sm.src}
                width={highlight.placeholder.sm.width}
                height={highlight.placeholder.sm.height}
              />
            ) : (
              <div id="game-placeholder-box"></div>
            )}
            <figcaption>{highlight.title}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};
