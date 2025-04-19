import { FC, useMemo } from "react";
import { GamePlayer } from "./types";

type GameStartingPitchersProps = {
  home: GamePlayer;
  away: GamePlayer;
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

const StartingPitcher: FC<GamePlayer> = (props) => {
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
      {avatar && (
        <img className="player-avatar" src={avatar} width={256} height={256} />
      )}
      <span className="player-name">{pitcher}</span>
      {summary && <span className="player-summary">{summary}</span>}
    </span>
  );
};
