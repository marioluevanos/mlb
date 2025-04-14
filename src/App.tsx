import { BaseSyntheticEvent, useCallback, useEffect, useState } from "react";
import { Header } from "./Header";
import { Game } from "./Game";
import { loadingData, timeAgo } from "./utils";

export type GameData = {
  date: string;
  games: Game[];
};

const CACHE_KEY = "games" as const;

function App() {
  const [data, setData] = useState<GameData>(loadingData(CACHE_KEY));

  /**
   * Get data from API or cache
   */
  const getData = useCallback(async (): Promise<GameData | undefined> => {
    const url = import.meta.env.VITE_API_URL;
    const response = await fetch(url);
    const json = await response.json();

    if (json && json.games) {
      const date = new Date();
      const data = { date: date.toISOString(), games: json.games };

      localStorage.setItem(CACHE_KEY, JSON.stringify(data));

      return data;
    }
  }, []);

  /**
   * Refresh data
   */
  const onRefresh = useCallback(
    async (event: BaseSyntheticEvent) => {
      setData(loadingData());
      const d = await getData();
      if (d) {
        event.target.dataset.timeAgo = timeAgo(d.date);
        setData(d);
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
      <Header
        date={data.date}
        cacheDate={timeAgo(data.date)}
        onRefresh={onRefresh}
      />
      {Array.isArray(data?.games) ? (
        data.games.map((game) => <Game key={game.id} game={game} />)
      ) : (
        <p>No games today</p>
      )}
    </>
  );
}

export default App;
