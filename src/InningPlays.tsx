import { FC } from "react";
import { Tabs } from "./Tabs";
import { GameToday } from "./types";
import { cn } from "./utils/cn";
import { PlayerProps } from "./Player";
import { PlaysByInning } from "./PlaysByInning";
import { ScoringPlays } from "./ScoringPlays";

type InningPlaysProps = {
  className?: string;
  game: GameToday;
  onPlayerClick?: PlayerProps["onClick"];
};

export const InningPlays: FC<InningPlaysProps> = (props) => {
  const { className, game, onPlayerClick } = props;
  const isFinal = game.status === "Final" || game.status === "Game Over";
  const isPreGame = game.status === "Pre-Game";
  const isScheduled = game.status === "Scheduled";
  const isWarmup = game.status === "Warmup";

  if (isFinal || isPreGame || isScheduled || isWarmup) {
    return null;
  }

  const tabs = [
    <>{game.currentInning.toLowerCase()} Plays</>,
    <>Scoring Plays</>,
  ];

  return (
    <Tabs className={cn("inning-plays", className)} tabs={tabs}>
      <PlaysByInning
        playsByInning={game.playsByInning}
        onPlayerClick={onPlayerClick}
      />
      <ScoringPlays
        scoringPlays={game.scoringPlays}
        onPlayerClick={onPlayerClick}
      />
    </Tabs>
  );
};
