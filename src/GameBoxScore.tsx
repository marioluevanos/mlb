import { FC } from "react";
import { TeamClub } from "./types";
import { Tabs } from "./Tabs";
import { BoxPlayers } from "./BoxPlayers";

type GameBoxScoreProps = {
  home: TeamClub;
  away: TeamClub;
  className?: string;
  winner?: "home" | "away";
};

export const GameBoxScore: FC<GameBoxScoreProps> = (props) => {
  const { home, away, winner } = props;
  const boxTabs = [];

  if (away.players?.length) {
    boxTabs.push(
      <>
        <span className="label">{away.abbreviation} (Away)</span>
        {winner === "away" ? <span>🏆</span> : null}
      </>
    );
  }

  if (home?.players?.length) {
    boxTabs.push(
      <>
        <span className="label">{home.abbreviation} (Home)</span>
        {winner === "home" ? <span>🏆</span> : null}
      </>
    );
  }

  return (
    <Tabs tabs={boxTabs}>
      <div>
        <BoxPlayers
          title={`Batting (${away.abbreviation})`}
          players={away.players}
          position="Batting"
          key="batting-away"
        />
        <BoxPlayers
          title={`Pitching (${away.abbreviation})`}
          players={away.players}
          position="Pitching"
          key="pitching-away"
        />
      </div>
      <div>
        <BoxPlayers
          title={`Batting (${home.abbreviation})`}
          players={home.players}
          position="Batting"
          key="batting-home"
        />
        <BoxPlayers
          title={`Pitching (${home.abbreviation})`}
          players={home.players}
          position="Pitching"
          key="pitching-home"
        />
      </div>
    </Tabs>
  );
};
