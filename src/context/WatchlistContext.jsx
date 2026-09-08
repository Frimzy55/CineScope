
import { createContext, useContext, useEffect, useState } from "react";

const WatchlistContext = createContext(null);

const STORAGE_KEY = "cinescope-watchlist";

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const savedWatchlist = localStorage.getItem(STORAGE_KEY);

      return savedWatchlist ? JSON.parse(savedWatchlist) : [];
    } catch (error) {
      console.error("Failed to load watchlist:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
    } catch (error) {
      console.error("Failed to save watchlist:", error);
    }
  }, [watchlist]);

  const isInWatchlist = (movieId) => {
    return watchlist.some((movie) => movie.id === movieId);
  };

  const addToWatchlist = (movie) => {
    setWatchlist((currentWatchlist) => {
      const alreadySaved = currentWatchlist.some(
        (item) => item.id === movie.id
      );

      if (alreadySaved) {
        return currentWatchlist;
      }

      return [...currentWatchlist, movie];
    });
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist((currentWatchlist) =>
      currentWatchlist.filter((movie) => movie.id !== movieId)
    );
  };

  const toggleWatchlist = (movie) => {
    setWatchlist((currentWatchlist) => {
      const alreadySaved = currentWatchlist.some(
        (item) => item.id === movie.id
      );

      if (alreadySaved) {
        return currentWatchlist.filter(
          (item) => item.id !== movie.id
        );
      }

      return [...currentWatchlist, movie];
    });
  };

  const clearWatchlist = () => {
    setWatchlist([]);
  };

  const value = {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist,
    isInWatchlist,
    clearWatchlist,
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);

  if (!context) {
    throw new Error(
      "useWatchlist must be used inside a WatchlistProvider."
    );
  }

  return context;
}

// Backward-compatible alias for the components already created.
export const useFavorites = useWatchlist;

