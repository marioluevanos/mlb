import { FC, useMemo } from "react";
import { Player } from "./Game";

type GameStartingPitchersProps = {
  home: Player;
  away: Player;
};

export const GameStartingPitchers: FC<GameStartingPitchersProps> = (props) => {
  const { home, away } = props;
  return (
    <div className="game-starting-pitchers">
      <h3>Probable Pitchers</h3>
      <StartingPitcher {...away} />
      <span className="vs">vs</span>
      <StartingPitcher {...home} />
    </div>
  );
};

const StartingPitcher: FC<Player> = (props) => {
  const { fullName, avatar, summary } = props;

  const pitcher = useMemo(() => {
    let name = "(TBD)";

    if (fullName) {
      const [first, last] = (fullName || "").split(" ");
      name = `${first} ${last}`;
    }

    return name;
  }, [fullName]);

  return (
    <span className="starting-pitcher player">
      <img className="player-avatar" src={avatar} />
      <span className="player-name">{pitcher}</span>
      {summary && <span className="player-summary">{summary}</span>}
    </span>
  );
};
