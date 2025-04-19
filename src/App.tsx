import {
  BaseSyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Header } from "./Header";
import { Game } from "./Game";
import { Standings } from "./Standings";
import { HeaderNav } from "./HeaderNav";
import { loadingData } from "./utils/loadingData";
import { timeAgo } from "./utils/timeAgo";
import { mapToGame } from "./utils/mapToGame";
import { updateMatchup } from "./utils/updateMatchup";
import { CurrentMatchup, GameStatus, GameToday } from "./types";

export type GameData = {
  date: string;
  games: GameToday[];
};

const CACHE_KEY = "games" as const;

function App() {
  const [data, setData] = useState<GameData>(loadingData(CACHE_KEY));
  const [isLoading, setIsLoading] = useState(false);
  const gameRefs = useRef<HTMLDetailsElement[]>([]);
  const [openGame, setOpenGame] = useState<number>();
  const wakeRef = useRef<WakeLockSentinel>(null);

  /**
   * Allow the phone to sleep
   */
  const releaseWakeLock = useCallback(async () => {
    if (wakeRef.current) {
      await wakeRef.current.release();
      wakeRef.current = null;
    }
  }, []);

  /**
   * Prevent the screen from sleeping
   */
  const acquireWakeLock = useCallback(async () => {
    try {
      wakeRef.current = await navigator.wakeLock.request("screen");
      wakeRef.current.addEventListener("release", () => undefined);
    } catch (error) {
      console.error(error);
    }
  }, []);

  /**
   * Get data from API or cache
   */
  const getData = useCallback(async (): Promise<GameData | undefined> => {
    setIsLoading(true);

    try {
      const url = import.meta.env.VITE_API_URL;
      const response = await fetch(url);
      const json = await response.json();

      if (json && json.games) {
        const date = new Date();
        const data = { date: date.toISOString(), games: json.games };

        localStorage.setItem(CACHE_KEY, JSON.stringify(data));

        return data;
      }
    } catch (error) {
      console.log(error);
      return { date: "", games: [] };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Refresh data
   */
  const onRefresh = useCallback(async () => {
    if (document.body.classList.contains("game-open")) {
      const details = gameRefs.current.find((d) => d.open);
      const game = data.games.find((g) => details && g.id === +details.id);
      if (game) {
        setIsLoading(true);
        await updateLiveGame(game);
        setIsLoading(false);
      }
    } else {
      document.body.classList.remove("game-open");
      setData(loadingData());
      const d = await getData();
      if (d) setData(d);
    }
  }, [getData]);

  /**
   * Is Game in progrss
   */
  const isGameInProgress = useCallback((status: GameStatus) => {
    return (
      status === "In Progress" ||
      status === "Warmup" ||
      status.startsWith("Umpire review") ||
      status.startsWith("Manager challenge")
    );
  }, []);

  /**
   * Updates live game
   */
  const updateLiveGame = useCallback(
    async (game: GameToday) => {
      const response = await fetch(game.feed);
      if (response.ok) {
        const json = await response.json();
        const updatedGame = mapToGame(game, json);

        let matchup: CurrentMatchup | undefined;
        if (updatedGame.currentPlay?.matchup && isGameInProgress(game.status)) {
          matchup = await updateMatchup(
            updatedGame.currentPlay?.matchup,
            updatedGame.id
          );
        }

        const updatedData = {
          date: new Date().toISOString(),
          games: data.games.map((g) => {
            if (updatedGame && g.id === updatedGame.id) {
              if (updatedGame.currentPlay?.matchup && matchup) {
                updatedGame.currentPlay.matchup = matchup;
              }

              return updatedGame;
            }

            return g;
          }),
        };

        localStorage.setItem(CACHE_KEY, JSON.stringify(updatedData));

        setData(updatedData);
      }
    },
    [data]
  );

  /**
   * Toggle game open state
   */
  const toggleGameOpen = useCallback(
    (event: BaseSyntheticEvent) => {
      if (event.target.nodeName !== "SUMMARY") return;

      const details = event.target.parentElement;
      if (details) {
        // Close all details (games)
        gameRefs.current.forEach((d) => {
          if (d.id !== details.id) {
            d.open = false;
          }
        });

        // Open the game clicked
        requestAnimationFrame(() => {
          if (details.open) {
            setOpenGame(Number(details.id));
            scrollTo({ behavior: "instant", top: details.offsetTop - 48 });
            const game = data.games.find((g) => g.id === +details.id);
            if (game) {
              updateLiveGame(game);
            }
            acquireWakeLock();
            document.body.classList.add("game-open");
          } else {
            setOpenGame(undefined);
            releaseWakeLock();
            document.body.classList.remove("game-open");
          }
        });
      }
    },
    [data.games, acquireWakeLock, releaseWakeLock, updateLiveGame]
  );

  /**
   * Handle game click
   */
  const onLogoClick = useCallback(() => {
    // Close all details (games)
    gameRefs.current.forEach((d) => {
      d.open = false;
    });
    document.body.classList.remove("game-open");
  }, []);

  /**
   * Handle game click
   */
  const onGameClick = useCallback(
    (event: BaseSyntheticEvent) => {
      toggleGameOpen(event);
    },
    [toggleGameOpen]
  );

  /**
   * Store HTML DOM reference
   */
  const setGameRefs = useCallback(
    (i: number, el: HTMLDetailsElement | null) => {
      if (el) {
        gameRefs.current[i] = el;
      }
    },
    []
  );

  const shouldUpdateGame = useCallback(
    (
      gameId: number,
      status: GameStatus,
      gameOpenId: typeof openGame
    ): boolean => {
      return isGameInProgress(status) && gameId === gameOpenId;
    },
    []
  );

  /**
   * Initialize data
   */
  useEffect(() => {
    if (!data.date) {
      getData().then((d) => d && setData(d));
    }
  }, [getData, data]);

  /**
   * Update live games
   */
  useEffect(() => {
    const ids: number[] = [];

    for (const game of data.games) {
      if (shouldUpdateGame(game.id, game.status, openGame)) {
        const intervalId = setInterval(() => {
          updateLiveGame(game);
        }, 15000);

        ids.push(intervalId);
      }
    }

    return () => {
      ids.forEach((id) => clearInterval(id));
    };
  }, [data.games, openGame, shouldUpdateGame, updateLiveGame]);

  return (
    <>
      <Header date={data.date} onLogoClick={onLogoClick}>
        <HeaderNav
          key="header-nav"
          onRefresh={onRefresh}
          date={data.date}
          isLoading={isLoading}
        />
      </Header>
      {Array.isArray(data?.games) ? (
        data.games.map((game, i) => (
          <Game
            onClick={onGameClick}
            ref={setGameRefs.bind(null, i)}
            key={game.id}
            game={game}
            isLoading={isLoading}
          />
        ))
      ) : (
        <p>No games today</p>
      )}
      <p className="last-updated">Last updated {timeAgo(data.date)}</p>
      <Standings />
    </>
  );
}

export default App;
