import { FC } from "react";
import { cn } from "./utils/cn";
import "./styles/ScoringPlays.scss";
import { ScoringPlay } from "./types";
import { CurrentInning } from "./CurrentInning";
import { Player, PlayerProps } from "./Player";

type PlayEventsProps = {
  scoringPlays?: ScoringPlay[];
  className?: string;
  onPlayerClick?: PlayerProps["onClick"];
};

export const ScoringPlays: FC<PlayEventsProps> = (props) => {
  const { className, scoringPlays = [], onPlayerClick } = props;

  return scoringPlays.length > 0 ? (
    <div className={cn("scoring-plays", className)}>
      <h3>Scoring Plays</h3>
      <ol>
        {scoringPlays
          .slice()
          .reverse()
          .map((event, i) => (
            <li className={cn("scoring-event")} key={i}>
              <span className="status-icon">
                <CurrentInning currentInning={event.inning} />
              </span>
              <span className="description">
                <span className="event">{event.result?.event}</span>
                {event.result?.description}
                <Player
                  onClick={onPlayerClick}
                  player={{
                    avatar: event.matchup.batter.avatar,
                    fullName: event.matchup.batter.fullName,
                    position: event.matchup.batter.position,
                    summary: event.result?.rbi
                      ? `(${event.result?.rbi} RBI)`
                      : "",
                  }}
                />
              </span>
            </li>
          ))}
      </ol>
    </div>
  ) : null;
};
