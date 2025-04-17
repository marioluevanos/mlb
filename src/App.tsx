import {
  BaseSyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Header } from "./Header";
import { CurrentMatchup, Game, GameStatus, GameToday } from "./Game";
import { loadingData, mapToGame, timeAgo, updateMatchup } from "./utils";
import { Standings } from "./Standings";
import { HeaderNav } from "./HeaderNav";

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
    setData(loadingData());
    const data = await getData();
    if (data) {
      setData(data);
    }
  }, [getData]);

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
        if (updatedGame.currentPlay?.matchup) {
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
  const toggleGameOpen = useCallback((event: BaseSyntheticEvent) => {
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
          scrollTo({ behavior: "smooth", top: details.offsetTop - 48 });
        } else {
          setOpenGame(undefined);
        }
      });
    }
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
      return (
        (status === "In Progress" ||
          status === "Warmup" ||
          status.startsWith("Umpire review") ||
          status.startsWith("Manager challenge")) &&
        gameId === gameOpenId
      );
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
      <Header date={data.date}>
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
