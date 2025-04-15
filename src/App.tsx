import {
  BaseSyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Header } from "./Header";
import { Game } from "./Game";
import cn, { loadingData, mapToGame, timeAgo } from "./utils";
import { RefreshIcon } from "./Icon";

export type GameData = {
  date: string;
  games: Game[];
};

const CACHE_KEY = "games" as const;

function App() {
  const [data, setData] = useState<GameData>(loadingData(CACHE_KEY));
  const [isLoading, setIsLoading] = useState(false);
  const gameRefs = useRef<HTMLDetailsElement[]>([]);

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
  const onRefresh = useCallback(
    async (event: BaseSyntheticEvent) => {
      setData(loadingData());
      const data = await getData();
      if (data) {
        event.target.dataset.timeAgo = timeAgo(data.date);
        setData(data);
      }
    },
    [getData]
  );

  /**
   * Updates live game
   */
  const updateLiveGame = useCallback(async (game: Game) => {
    const response = await fetch(game.feed);
    if (response.ok) {
      const json = await response.json();
      return mapToGame(game, json);
    }
  }, []);

  /**
   * Toggle game open state
   */
  const toggleGameOpen = useCallback((event: BaseSyntheticEvent) => {
    if (event.target.nodeName !== "SUMMARY") return;

    const details = event.target.parentElement as HTMLDetailsElement | null;
    if (details) {
      gameRefs.current.forEach((d) => {
        if (d.id !== details.id) {
          d.open = false;
        }
      });

      requestAnimationFrame(() => {
        if (details.open) {
          console.log(details.offsetTop);
          scrollTo({ behavior: "smooth", top: details.offsetTop });
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

  /**
   * Initialize data
   */
  useEffect(() => {
    if (!data.date) {
      getData().then((d) => d && setData(d));
    }
  }, [getData, data]);

  /**
   * @todo
   * Update live games
   */
  useEffect(() => {
    const ids: number[] = [];

    for (const game of data.games) {
      if (game.status === "In Progress") {
        const id = setInterval(() => {
          updateLiveGame(game).then((updated) => {
            console.log({ updated });
            setData((prev) => {
              return {
                date: prev.date,
                games: prev.games.map((g) => {
                  if (updated && g.id === updated.id) {
                    return updated;
                  }
                  return g;
                }),
              };
            });
          });
        }, 5000);
        ids.push(id);
      }
    }

    return () => {
      ids.forEach((id) => clearInterval(id));
    };
  }, [data.games, updateLiveGame]);

  return (
    <>
      <Header date={data.date}>
        <button
          id="refresh"
          className={cn("button", isLoading && "loading")}
          title="Refresh content"
          onClick={onRefresh}
          data-time-ago={timeAgo(data.date)}
        >
          <RefreshIcon />
        </button>
      </Header>
      {Array.isArray(data?.games) ? (
        data.games
          .sort((a) => (a.status === "Final" ? 1 : -1))
          .map((game, i) => (
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
    </>
  );
}

export default App;
