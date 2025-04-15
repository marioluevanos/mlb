import { BaseSyntheticEvent, useCallback, useEffect, useState } from "react";
import { Header } from "./Header";
import { Game } from "./Game";
import cn, { loadingData, timeAgo } from "./utils";
import { RefreshIcon } from "./Icon";

export type GameData = {
  date: string;
  games: Game[];
};

const CACHE_KEY = "games" as const;

function App() {
  const [data, setData] = useState<GameData>(loadingData(CACHE_KEY));
  const [isLoading, setIsLoading] = useState(false);

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
   * Initialize data
   */
  useEffect(() => {
    if (!data.date) {
      getData().then((d) => d && setData(d));
    }
  }, [getData, data]);

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
          .map((game) => (
            <Game key={game.id} game={game} isLoading={isLoading} />
          ))
      ) : (
        <p>No games today</p>
      )}
    </>
  );
}

export default App;
