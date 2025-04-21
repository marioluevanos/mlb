import {
  BaseSyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Header } from "./Header";
import { Game } from "./Game";
import { HeaderNav } from "./HeaderNav";
import { loadingData } from "./utils/loadingData";
import { timeAgo } from "./utils/timeAgo";
import { mapToGame } from "./utils/mapToGame";
import { GameStatus, GameToday } from "./types";
import { MLBContent } from "./mlb.types";

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
      if (navigator.wakeLock) {
        wakeRef.current = await navigator.wakeLock.request("screen");
        wakeRef.current.addEventListener("release", () => undefined);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  /**
   *
   */
  const scrollToGame = useCallback(
    (
      gameId: string | undefined,
      behavior: ScrollOptions["behavior"] = "smooth"
    ) => {
      const game = gameRefs.current.find((d) => d.id === gameId);
      if (game) {
        scrollTo({ behavior, top: game.offsetTop - 48 });
      }
    },
    []
  );

  /**
   *
   */
  const onFullscreenChange = useCallback(() => {
    () => {
      document.body.classList.remove("game-open");
      scrollToGame(openGame?.toString(), "instant");
    };
  }, [scrollToGame, openGame?.toString()]);

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
        const highlights = await getHighlights(game.content);

        const updatedData = {
          date: new Date().toISOString(),
          games: data.games.map((g) => {
            if (updatedGame && g.id === updatedGame.id) {
              updatedGame.highlights = highlights;
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
   * Updates live game
   */
  const getHighlights = useCallback(
    async (contentUrl: string): Promise<GameToday["highlights"]> => {
      const response = await fetch(contentUrl);
      const content = (await response.json()) as MLBContent;
      const items = content.highlights?.highlights?.items;

      return items.map((item) => ({
        type: item.type,
        title: item.title,
        description: item.description,
        duration: item.duration,
        placeholder: {
          sm: item.image?.cuts.find((img) => img.width < 400),
          lg: item.image?.cuts.find((img) => img.width < 1400),
        },
        video:
          item.playbacks.find((vid) => vid.name === "mp4Avc") ||
          item.playbacks[0],
      }));
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
        gameRefs.current.forEach((d) => {
          if (d.id !== details.id) {
            d.open = false; // Close all details (games)
          }
        });

        // Open the game clicked
        if (details.open) {
          setOpenGame(Number(details.id));
          scrollToGame(details.id, "smooth");
          const game = data.games.find((g) => g.id === +details.id);
          if (game) updateLiveGame(game);
          acquireWakeLock();
          document.body.classList.add("game-open");
        } else {
          setOpenGame(undefined);
          releaseWakeLock();
          document.body.classList.remove("game-open");
        }
      }
    },
    [data.games, acquireWakeLock, releaseWakeLock, updateLiveGame, scrollToGame]
  );

  /**
   * Handle game click
   */
  const onLogoClick = useCallback(() => {
    let activeGame;
    gameRefs.current.forEach((d) => {
      if (d.open) activeGame = d.id;
      d.open = false; // Close all details (games)
    });

    setOpenGame(undefined);
    scrollToGame(activeGame, "instant");
    releaseWakeLock();
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
      <Header onLogoClick={onLogoClick}>
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
            onFullscreenChange={onFullscreenChange}
            ref={setGameRefs.bind(null, i)}
            onClick={onGameClick}
            isLoading={isLoading}
            key={game.id}
            game={game}
            isOpen={game.id === openGame}
          />
        ))
      ) : (
        <p>No games today</p>
      )}
      {data.date && (
        <p className="last-updated">Last updated {timeAgo(data.date)}</p>
      )}
    </>
  );
}

export default App;
