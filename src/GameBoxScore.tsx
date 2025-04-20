import { FC } from "react";
import { GamePlayer, GameStatus, TeamClub } from "./types";
import { Tabs } from "./Tabs";
import { BoxPlayers } from "./BoxPlayers";
import { cn } from "./utils/cn";

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
};

export const GameBoxScore: FC<GameBoxScoreProps> = (props) => {
  const { home, away, winner, status, matchup } = props;
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

  if (hasAwayBatting || hasAwayPitching) {
    boxTabs.push(
      <>
        <span className="label">{away.abbreviation} (Away)</span>
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
        {isFinal && (
          <span className={cn(homeWin ? "win" : "loss")}>
            {homeWin ? "W" : "L"} {home.record.wins}&ndash;{home.record.losses}
          </span>
        )}
      </>
    );
  }

  return (
    <Tabs tabs={boxTabs}>
      <div>
        {hasAwayBatting && (
          <BoxPlayers
            title={`Batting (${away.abbreviation})`}
            players={away.players}
            position="Batting"
            key="batting-away"
            matchup={matchup}
          />
        )}
        {hasAwayPitching && (
          <BoxPlayers
            title={`Pitching (${away.abbreviation})`}
            players={away.players}
            position="Pitching"
            key="pitching-away"
            matchup={matchup}
          />
        )}
      </div>
      <div>
        {hasHomeBatting && (
          <BoxPlayers
            title={`Batting (${home.abbreviation})`}
            players={home.players}
            position="Batting"
            key="batting-home"
            matchup={matchup}
          />
        )}
        {hasHomePitching && (
          <BoxPlayers
            title={`Pitching (${home.abbreviation})`}
            players={home.players}
            position="Pitching"
            key="pitching-home"
            matchup={matchup}
          />
        )}
      </div>
    </Tabs>
  );
};
