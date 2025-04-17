import { FC } from "react";
import { cn } from "./utils/cn";

export type PlayEvent = {
  event: string;
  description: string;
};

type PlayEventsProps = {
  events?: PlayEvent[];
  className?: string;
};

export const PlayEvents: FC<PlayEventsProps> = (props) => {
  const { className, events = [] } = props;

  return events.length > 0 ? (
    <div className={cn("play-events", className)}>
      <h3>Events</h3>
      <ol>
        {events
          .slice()
          .reverse()
          .map((event, i) => (
            <li className="play-event" key={i}>
              <span className="status-icon">{events.length - i}</span>
              {/* {event.event && <span className="event">{event.event}</span>} */}
              <span className="description">{event.description}</span>
            </li>
          ))}
      </ol>
    </div>
  ) : null;
};
