import { FC } from "react";
import { GamePlayer, GameStatus, TeamClub } from "./types";
import { Tabs } from "./Tabs";
import { BoxPlayers } from "./BoxPlayers";

type GameBoxScoreProps = {
  home: TeamClub;
  away: TeamClub;
  className?: string;
  winner?: "home" | "away";
  status?: GameStatus;
};

export const GameBoxScore: FC<GameBoxScoreProps> = (props) => {
  const { home, away, winner, status } = props;
  const hasData = (type: "batting" | "pitching", players: GamePlayer[] = []) =>
    players.some((p) => p.game && Object.values(p.game[type] || {}).length > 0);
  const hasAwayBatting = hasData("batting", away.players);
  const hasAwayPitching = hasData("pitching", away.players);
  const hasHomeBatting = hasData("batting", home.players);
  const hasHomePitching = hasData("pitching", home.players);
  const isFinal = status === "Final" || status === "Game Over";
  const boxTabs = [];

  if (hasAwayBatting || hasAwayPitching) {
    boxTabs.push(
      <>
        <span className="label">{away.abbreviation} (Away)</span>
        {isFinal && winner === "away" ? <span>🏆</span> : null}
      </>
    );
  }

  if (hasHomeBatting || hasHomePitching) {
    boxTabs.push(
      <>
        <span className="label">{home.abbreviation} (Home)</span>
        {isFinal && winner === "home" ? <span>🏆</span> : null}
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
          />
        )}
        {hasAwayPitching && (
          <BoxPlayers
            title={`Pitching (${away.abbreviation})`}
            players={away.players}
            position="Pitching"
            key="pitching-away"
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
          />
        )}
        {hasHomePitching && (
          <BoxPlayers
            title={`Pitching (${home.abbreviation})`}
            players={home.players}
            position="Pitching"
            key="pitching-home"
          />
        )}
      </div>
    </Tabs>
  );
};
