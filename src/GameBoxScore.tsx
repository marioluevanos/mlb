import { FC, useState } from "react";
import { GamePlayer, GameStatus, TeamClub } from "./types";
import { BoxPlayers, BoxPlayersProps } from "./BoxPlayers";
import { cn } from "./utils/cn";
import { AtBatIcon } from "./Icon";

export type GameBoxScoreProps = {
  home: TeamClub;
  away: TeamClub;
  className?: string;
  winner?: "home" | "away";
  status?: GameStatus;
  matchup?: {
    batterId?: number;
    pitcherId?: number;
  };
  currentInning?: string;
  onPlayerClick?: BoxPlayersProps["onPlayerClick"];
};

export const GameBoxScore: FC<GameBoxScoreProps> = (props) => {
  const { home, away, winner, status, matchup, currentInning, onPlayerClick } =
    props;
  const [activeTab, setActiveTab] = useState<number>(0);
  const hasData = (type: "batting" | "pitching", players: GamePlayer[] = []) =>
    players.some((p) => p.game && Object.values(p.game[type] || {}).length > 0);
  const hasAwayBatting = hasData("batting", away.players);
  const hasAwayPitching = hasData("pitching", away.players);
  const hasHomeBatting = hasData("batting", home.players);
  const hasHomePitching = hasData("pitching", home.players);
  const isFinal = status === "Final" || status === "Game Over";
  const boxTabs = [];
  const awayWin = winner === "away";
  const homeWin = winner === "home";
  const isTop = !isFinal && currentInning?.startsWith("TOP");

  if (hasAwayBatting || hasAwayPitching) {
    boxTabs.push(
      <>
        <span className="label">{away.abbreviation} (Away)</span>
        {!isFinal && isTop && <AtBatIcon className="at-bat-icon" />}
        {isFinal && (
          <span className={cn(awayWin ? "win" : "loss")}>
            {awayWin ? "W" : "L"} {away.record.wins}&ndash;{away.record.losses}
          </span>
        )}
      </>
    );
  }

  if (hasHomeBatting || hasHomePitching) {
    boxTabs.push(
      <>
        <span className="label">{home.abbreviation} (Home)</span>
        {!isFinal && !isTop && <AtBatIcon className="at-bat-icon" />}
        {isFinal && (
          <span className={cn(homeWin ? "win" : "loss")}>
            {homeWin ? "W" : "L"} {home.record.wins}&ndash;{home.record.losses}
          </span>
        )}
      </>
    );
  }

  return (
    <section className={cn("game-box-score tabs")}>
      {boxTabs.length > 0 ? (
        <div className="tabs-actions">
          {boxTabs?.map((t, i) => (
            <button
              className={cn("button", i === activeTab && "active")}
              key={i}
              onClick={() => {
                setActiveTab(i);
              }}
            >
              {t}
            </button>
          ))}
        </div>
      ) : null}
      <div className="tabs-content">
        {activeTab === 0 && (hasAwayBatting || hasAwayPitching) && (
          <div>
            {hasAwayBatting && (
              <BoxPlayers
                onPlayerClick={onPlayerClick}
                className={cn(isFinal && "final")}
                title={`Batting (${away.abbreviation})`}
                players={away.players}
                position="Batting"
                key="batting-away"
                matchup={matchup}
              />
            )}
            {hasAwayPitching && (
              <BoxPlayers
                onPlayerClick={onPlayerClick}
                className={cn(isFinal && "final")}
                title={`Pitching (${away.abbreviation})`}
                players={away.players}
                position="Pitching"
                key="pitching-away"
                matchup={matchup}
              />
            )}
          </div>
        )}
        {activeTab === 1 && (hasHomeBatting || hasHomePitching) && (
          <div>
            {hasHomeBatting && (
              <BoxPlayers
                onPlayerClick={onPlayerClick}
                className={cn(isFinal && "final")}
                title={`Batting (${home.abbreviation})`}
                players={home.players}
                position="Batting"
                key="batting-home"
                matchup={matchup}
              />
            )}
            {hasHomePitching && (
              <BoxPlayers
                onPlayerClick={onPlayerClick}
                className={cn(isFinal && "final")}
                title={`Pitching (${home.abbreviation})`}
                players={home.players}
                position="Pitching"
                key="pitching-home"
                matchup={matchup}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
};
