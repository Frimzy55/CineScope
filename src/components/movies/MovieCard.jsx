import { useFavorites } from "../../context/WatchlistContext";
import RatingBadge from "../common/RatingBadge";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie, onSelect }) {
  const { isInWatchlist, toggleWatchlist } = useFavorites();

  const isSaved = isInWatchlist(movie.id);

  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "N/A";

  const handleWatchlistClick = (event) => {
    event.stopPropagation();
    toggleWatchlist(movie);
  };

  return (
    <article
      className="movie-card"
      onClick={() => onSelect(movie)}
      tabIndex={0}
      role="button"
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(movie);
        }
      }}
    >
      <div className="movie-poster-wrapper">
        {movie.poster_path ? (
          <img
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={`${movie.title} poster`}
            className="movie-poster"
            loading="lazy"
          />
        ) : (
          <div className="movie-poster movie-poster-placeholder">
            <span>No poster</span>
          </div>
        )}

        <button
          type="button"
          className={`watchlist-button ${
            isSaved ? "saved" : ""
          }`}
          onClick={handleWatchlistClick}
          aria-label={
            isSaved
              ? `Remove ${movie.title} from watchlist`
              : `Add ${movie.title} to watchlist`
          }
          aria-pressed={isSaved}
        >
          {isSaved ? "♥" : "♡"}
        </button>
      </div>

      <div className="movie-card-content">
        <div className="movie-card-title-row">
          <h3 className="movie-title">{movie.title}</h3>

          <RatingBadge rating={movie.vote_average} />
        </div>

        <p className="movie-year">{releaseYear}</p>
      </div>
    </article>
  );
}