import {
  BaseSyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Header } from "./Header";
import { Game, GameToday } from "./Game";
import cn, { loadingData, mapToGame, timeAgo } from "./utils";
import { RefreshIcon } from "./Icon";

export type GameData = {
  date: string;
  games: GameToday[];
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
  const updateLiveGame = useCallback(async (game: GameToday) => {
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

    const details = event.target.parentElement;
    if (details) {
      gameRefs.current.forEach((d) => {
        if (d.id !== details.id) {
          d.open = false;
        }
      });

      requestAnimationFrame(() => {
        if (details.open) {
          scrollTo({ behavior: "smooth", top: details.offsetTop - 48 });
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
            setData((prev) => {
              return {
                date: new Date().toISOString(),
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
        <div className="ctas">
          {/* <button
            id="previous-date"
            className={cn("button", isLoading && "loading")}
            title="Previous date"
            onClick={onRefresh}
            data-day={previousDay(data.date)}
          >
            <LeftIcon />
          </button> */}
          <button
            id="refresh"
            className={cn("button", isLoading && "loading")}
            title="Refresh content"
            onClick={onRefresh}
            data-date={data.date}
          >
            <RefreshIcon />
          </button>
          {/* <button
            id="next-date"
            className={cn("button", isLoading && "loading")}
            title="Next date"
            onClick={onRefresh}
            data-day={nextDay(data.date)}
          >
            <RightIcon />
          </button> */}
        </div>
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
      <p className="last-updated">Last updated {timeAgo(data.date)}</p>
    </>
  );
}

export default App;
