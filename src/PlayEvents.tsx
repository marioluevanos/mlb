import { FC } from "react";
import { cn } from "./utils/cn";
import { PlayEvent, PlayResult } from "./mlb.types";
import "./styles/PlayEvents.scss";
import { HourglassIcon, SwitchIcon } from "./Icon";

type PlayEventsProps = {
  events?: Partial<PlayEvent>[];
  result?: Partial<PlayResult>;
  className?: string;
};

export const PlayEvents: FC<PlayEventsProps> = (props) => {
  const { className, events = [], result } = props;

  const isSub = (event: Partial<PlayEvent>) => {
    return (
      event.type === "action" &&
      "isSubstitution" in event &&
      event.isSubstitution
    );
  };

  const isInPlay = (event: Partial<PlayEvent>) => {
    return event.isPitch && event.details?.isInPlay;
  };

  console.log(events);

  return events.length > 0 ? (
    <div className={cn("play-events", className)}>
      <ol>
        {events
          .slice()
          .reverse()
          .map((event, i) => (
            <li
              className={cn(
                "play-event",
                event.isPitch && event.details?.isStrike && "is-strike",
                isInPlay(event) && "is-in-play",
                event.isPitch && event.details?.isBall && "is-ball",
                event.details?.isOut && "is-out",
                isSub(event) && "is-sub"
              )}
              key={i}
              data-type={event.type}
            >
              <span className="status-icon">
                {event.isPitch ? (
                  event.pitchNumber
                ) : isSub(event) ? (
                  <SwitchIcon />
                ) : (
                  <HourglassIcon />
                )}
              </span>

              <span className="description">
                {event.details && "event" in event.details && (
                  <span className="event">{event.details.event}</span>
                )}
                {isInPlay(event)
                  ? result?.description
                  : event.details?.description}
                {event.isPitch && (
                  <span className="pitch">
                    <span className="mph">
                      {event.pitchData?.startSpeed} mph{" "}
                    </span>
                    <span className="type">
                      {event.details?.type.description}
                    </span>
                  </span>
                )}
              </span>
              {event.isPitch && !isInPlay(event) && (
                <span className="count">
                  {event.count?.balls}&ndash;{event.count?.strikes}
                </span>
              )}
            </li>
          ))}
      </ol>
    </div>
  ) : null;
};
