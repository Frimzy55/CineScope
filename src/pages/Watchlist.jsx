
import { useState } from "react";
import PageContainer from "../components/layout/PageContainer";
import MovieGrid from "../components/movies/MovieGrid";
import MovieDetailDrawer from "../components/movies/MovieDetailDrawer";
import EmptyState from "../components/common/EmptyState";
import { useWatchlist } from "../context/WatchlistContext";

export default function Watchlist() {
  const { watchlist } = useWatchlist();
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseDrawer = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <PageContainer>
        <section className="watchlist-header">
          <div>
            <h1>My Watchlist</h1>
            <p>
              Movies you've saved to watch later.
            </p>
          </div>

          {watchlist.length > 0 && (
            <span className="watchlist-count">
              {watchlist.length}{" "}
              {watchlist.length === 1 ? "movie" : "movies"}
            </span>
          )}
        </section>

        {watchlist.length === 0 ? (
          <EmptyState
            title="Your watchlist is empty"
            message="Save movies you want to watch later and they'll appear here."
            actionLabel="Discover movies"
            actionTo="/"
          />
        ) : (
          <MovieGrid
            movies={watchlist}
            onSelect={handleMovieSelect}
          />
        )}
      </PageContainer>

      <MovieDetailDrawer
        movie={selectedMovie}
        onClose={handleCloseDrawer}
      />
    </>
  );
}

