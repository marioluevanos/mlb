import { BaseSyntheticEvent, FC, Ref } from "react";
import { Team } from "./Team";
import { TeamScore } from "./TeamScore";
import { GameDetails } from "./GameDetails";
import { TopPerformers } from "./TopPerformers";
import { GameStreams } from "./GameStreams";
import { GameHighlights } from "./GameHighlights";
import { BoxScore } from "./BoxScore";
import { GameMatchup } from "./GameMatchup";
import { GameDecisions } from "./GameDecisions";
import { GameStartingPitchers } from "./GameStartingPitchers";
import { GameBug } from "./GameBug";
import { PlayEvents } from "./PlayEvents";
import { isWinner } from "./utils/isWinner";
import { cn } from "./utils/cn";
import { GameToday } from "./types";
import { GameBoxScore, GameBoxScoreProps } from "./GameBoxScore";
import { TeamCompare } from "./TeamCompare";
import { InningPlays } from "./InningPlays";

export type GameProps = {
  className?: string;
  isLoading?: boolean;
  game: GameToday;
  onClick?: (event: BaseSyntheticEvent) => void;
  ref?: Ref<HTMLDetailsElement | null> | null;
  onFullscreenChange?: () => void;
  isOpen?: boolean;
  onPlayerClick?: GameBoxScoreProps["onPlayerClick"];
};

export const Game: FC<GameProps> = (props) => {
  const {
    game,
    isLoading,
    ref,
    onClick,
    onFullscreenChange,
    onPlayerClick,
    isOpen,
  } = props;
  const { away, home } = game;
  const isFinal = game.status === "Final" || game.status === "Game Over";
  const isPreGame = game.status === "Pre-Game";
  const isPostponed = game.status === "Postponed";
  const isScheduled = game.status === "Scheduled";
  const inProgress = game.status === "In Progress";
  const isWarmup = game.status === "Warmup";
  const isPre = isPreGame || isScheduled || isWarmup;
  const winner = isWinner(home, away);

  return (
    <details
      ref={ref}
      data-status={game.status}
      id={game.id.toString()}
      onClick={onClick}
    >
      <summary className={cn(isFinal && "final")}>
        <span className="teams">
          <Team
            team={away}
            className={cn(
              isLoading && "loading",
              winner === "away" && "winner"
            )}
          >
            <BoxScore
              innings={game.innings}
              team="away"
              className={cn(game.currentInning, "away")}
            />
            <TeamScore
              status={game.status}
              className={cn(isLoading && "loading")}
              score={away.score}
            />
          </Team>
          <Team
            team={home}
            className={cn(
              isLoading && "loading",
              winner === "home" && "winner"
            )}
          >
            <BoxScore
              innings={game.innings}
              team="home"
              className={cn(game.currentInning, "home")}
            />
            <TeamScore
              status={game.status}
              className={cn(isLoading && "loading")}
              score={home.score}
            />
          </Team>
        </span>
        <GameDetails game={game} className={cn(isLoading && "loading")} />
      </summary>
      <footer className="game-footer">
        {isPre && (
          <GameStartingPitchers
            home={home.startingPitcher}
            away={away.startingPitcher}
            onPlayerClick={onPlayerClick}
          />
        )}

        <GameDecisions
          onPlayerClick={onPlayerClick}
          decisions={game.decisions}
        />

        {inProgress && (
          <GameMatchup
            key={
              game.currentPlay?.matchup.pitcher.summary +
              `${game.currentPlay?.matchup.batter.summary}`
            }
            gameId={game.id}
            currentPlay={game.currentPlay}
            onPlayerClick={onPlayerClick}
          >
            <GameBug
              currentPlay={game.currentPlay}
              currentInning={game.currentInning}
            />
            {!isFinal && (
              <PlayEvents
                events={game.currentPlay?.events}
                result={game.currentPlay?.result}
              />
            )}
          </GameMatchup>
        )}

        <InningPlays game={game} />

        {!isPre && !isPostponed && (
          <TeamCompare away={game.away} home={game.home} />
        )}

        <GameBoxScore
          onPlayerClick={onPlayerClick}
          currentInning={game.currentInning}
          status={game.status}
          matchup={{
            batterId: game.currentPlay?.matchup.batter.id,
            pitcherId: game.currentPlay?.matchup.pitcher.id,
          }}
          away={game.away}
          home={game.home}
          winner={winner}
        />

        {game.topPerformers.length > 0 && !isPre && !isPostponed ? (
          <TopPerformers
            players={game.topPerformers}
            onPlayerClick={onPlayerClick}
          />
        ) : null}

        <GameHighlights
          title={isPre ? "Preview" : "Highlights"}
          highlights={game.highlights}
          onFullscreenChange={onFullscreenChange}
          isOpen={isOpen}
        />

        {!isFinal && <GameStreams streams={game.streams} />}
      </footer>
    </details>
  );
};
