
import { useEffect, useState } from "react";
import { getMovieCredits, getMovieDetails } from "../../api/tmdb";
import { useFavorites } from "../../context/WatchlistContext";
import RatingBadge from "../common/RatingBadge";
import CastList from "./CastList";
import ErrorMessage from "../common/ErrorMessage";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieDetailDrawer({ movie, onClose }) {
  const [details, setDetails] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { isInWatchlist, toggleWatchlist } = useFavorites();

  useEffect(() => {
    if (!movie) return;

    const fetchMovieDetails = async () => {
      setLoading(true);
      setError("");
      setDetails(null);
      setCredits(null);

      try {
        const [movieDetails, movieCredits] = await Promise.all([
          getMovieDetails(movie.id),
          getMovieCredits(movie.id),
        ]);

        setDetails(movieDetails);
        setCredits(movieCredits);
      } catch (err) {
        console.error(err);
        setError("Unable to load movie details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movie]);

  useEffect(() => {
    if (!movie) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [movie, onClose]);

  if (!movie) {
    return null;
  }

  const isSaved = isInWatchlist(movie.id);

  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "N/A";

  const handleWatchlist = () => {
    toggleWatchlist(details || movie);
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <aside
        className="movie-detail-drawer"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="movie-detail-title"
      >
        <button
          type="button"
          className="drawer-close-button"
          onClick={onClose}
          aria-label="Close movie details"
        >
          ×
        </button>

        {loading && (
          <div className="drawer-loading">
            <div className="drawer-spinner" />
            <p>Loading movie details...</p>
          </div>
        )}

        {!loading && error && (
          <div className="drawer-error">
            <ErrorMessage message={error} />
          </div>
        )}

        {!loading && !error && details && (
          <>
            <div className="drawer-poster-wrapper">
              {details.poster_path ? (
                <img
                  src={`${IMAGE_BASE_URL}${details.poster_path}`}
                  alt={`${details.title} poster`}
                  className="drawer-poster"
                />
              ) : (
                <div className="drawer-poster drawer-poster-placeholder">
                  <span>No poster available</span>
                </div>
              )}
            </div>

            <div className="drawer-content">
              <div className="drawer-header">
                <div>
                  <h2 id="movie-detail-title">{details.title}</h2>

                  {details.tagline && (
                    <p className="movie-tagline">
                      {details.tagline}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  className={`drawer-watchlist-button ${
                    isSaved ? "saved" : ""
                  }`}
                  onClick={handleWatchlist}
                  aria-label={
                    isSaved
                      ? `Remove ${details.title} from watchlist`
                      : `Add ${details.title} to watchlist`
                  }
                  aria-pressed={isSaved}
                >
                  {isSaved ? "♥" : "♡"}
                </button>
              </div>

              <div className="drawer-meta">
                <span>{releaseYear}</span>

                {details.runtime > 0 && (
                  <>
                    <span className="meta-separator">•</span>
                    <span>{details.runtime} min</span>
                  </>
                )}

                <RatingBadge rating={details.vote_average} />
              </div>

              {details.genres?.length > 0 && (
                <div className="drawer-genres">
                  {details.genres.map((genre) => (
                    <span key={genre.id} className="genre-tag">
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              <section className="drawer-section">
                <h3>Overview</h3>
                <p className="movie-overview">
                  {details.overview || "No overview available."}
                </p>
              </section>

              {credits && <CastList cast={credits.cast || []} />}
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

