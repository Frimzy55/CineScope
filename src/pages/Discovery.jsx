
import { useCallback, useEffect, useState } from "react";
import {
  discoverMovies,
  getGenres,
  searchMovies,
} from "../api/tmdb";

import PageContainer from "../components/layout/PageContainer";
import SearchBar from "../components/common/SearchBar";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";

import GenreChips from "../components/filters/GenreChips";
import SortControls from "../components/filters/SortControls";

import MovieGrid from "../components/movies/MovieGrid";
import MovieSkeleton from "../components/movies/MovieSkeleton";
import MovieDetailDrawer from "../components/movies/MovieDetailDrawer";

import useDebounce from "../hooks/useDebounce";

export default function Discovery() {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 350);

  const [sortBy, setSortBy] = useState("popularity.desc");

  const [movies, setMovies] = useState([]);

  const [genresLoading, setGenresLoading] = useState(true);
  const [moviesLoading, setMoviesLoading] = useState(true);

  const [genresError, setGenresError] = useState("");
  const [moviesError, setMoviesError] = useState("");

  const [selectedMovie, setSelectedMovie] = useState(null);

  /*
   * Fetch genres when the discovery page loads.
   */
  const fetchGenres = useCallback(async () => {
    setGenresLoading(true);
    setGenresError("");

    try {
      const data = await getGenres();

      setGenres(data.genres || []);
    } catch (error) {
      console.error(error);
      setGenresError("Unable to load movie genres.");
    } finally {
      setGenresLoading(false);
    }
  }, []);

  /*
   * Fetch movies based on the current search, genres and sorting.
   */
  const fetchMovies = useCallback(async () => {
    setMoviesLoading(true);
    setMoviesError("");

    try {
      let data;

      const hasSearch = debouncedSearch.trim().length > 0;

      if (hasSearch) {
        /*
         * TMDB's search endpoint does not accept the same
         * genre/sort parameters as discover.
         *
         * We therefore search first and apply the selected
         * genre filter and sorting to the returned results.
         */
        data = await searchMovies(debouncedSearch.trim());

        let results = data.results || [];

        // Multiple selected genres must match ALL selected genres.
        if (selectedGenres.length > 0) {
          results = results.filter((movie) =>
            selectedGenres.every((genreId) =>
              movie.genre_ids?.includes(genreId)
            )
          );
        }

        results = sortMovies(results, sortBy);

        setMovies(results);
      } else {
        /*
         * Discover endpoint supports TMDB's native sort_by
         * and with_genres parameters.
         *
         * Passing comma-separated genre IDs means the movie
         * must contain ALL selected genres.
         */
        const params = {
          sort_by: sortBy,
          page: 1,
          include_adult: false,
          include_video: false,
        };

        if (selectedGenres.length > 0) {
          params.with_genres = selectedGenres.join(",");
        }

        data = await discoverMovies(params);

        setMovies(data.results || []);
      }
    } catch (error) {
      console.error(error);
      setMoviesError("Unable to load movies. Please try again.");
      setMovies([]);
    } finally {
      setMoviesLoading(false);
    }
  }, [debouncedSearch, selectedGenres, sortBy]);

  /*
   * Load genres once when the page mounts.
   */
  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  /*
   * Reload movies whenever the debounced search,
   * selected genres or sort option changes.
   */
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  /*
   * Toggle a genre without replacing the other selections.
   */
  const handleGenreToggle = (genreId) => {
    setSelectedGenres((currentGenres) => {
      if (currentGenres.includes(genreId)) {
        return currentGenres.filter((id) => id !== genreId);
      }

      return [...currentGenres, genreId];
    });
  };

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  const handleClearSearch = () => {
    setSearch("");
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseDrawer = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <PageContainer>
        <section className="discovery-header">
          <div className="discovery-intro">
            <h1>Discover Movies</h1>
            <p>
              Find your next favorite movie from thousands of titles.
            </p>
          </div>

          <SearchBar
            value={search}
            onChange={handleSearchChange}
            onClear={handleClearSearch}
          />
        </section>

        {genresLoading ? (
          <div className="genre-loading">
            <span>Loading genres...</span>
          </div>
        ) : genresError ? (
          <ErrorMessage
            message={genresError}
            onRetry={fetchGenres}
          />
        ) : (
          <GenreChips
            genres={genres}
            selectedGenres={selectedGenres}
            onGenreToggle={handleGenreToggle}
          />
        )}

        <div className="movie-section-header">
          <div>
            <h2>
              {debouncedSearch.trim()
                ? `Search results for "${debouncedSearch.trim()}"`
                : "Popular Movies"}
            </h2>

            {!moviesLoading && !moviesError && (
              <p className="movie-count">
                {movies.length}{" "}
                {movies.length === 1 ? "movie" : "movies"}
              </p>
            )}
          </div>

          <SortControls
            sortBy={sortBy}
            onSortChange={handleSortChange}
          />
        </div>

        {moviesLoading ? (
          <div className="movie-grid">
            {Array.from({ length: 8 }).map((_, index) => (
              <MovieSkeleton key={index} />
            ))}
          </div>
        ) : moviesError ? (
          <ErrorMessage
            message={moviesError}
            onRetry={fetchMovies}
          />
        ) : movies.length === 0 ? (
          <EmptyState
            title={
              debouncedSearch.trim()
                ? "No movies found"
                : "No movies available"
            }
            message={
              debouncedSearch.trim()
                ? "Try another search or change your selected genres."
                : "Try changing your filters or sorting options."
            }
          />
        ) : (
          <MovieGrid
            movies={movies}
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

/*
 * Sorting used for search results.
 *
 * The Discover endpoint uses TMDB's native sort_by parameter.
 * Search results need to be sorted locally because the search
 * endpoint does not provide the same sort_by functionality.
 */
function sortMovies(movies, sortBy) {
  const sortedMovies = [...movies];

  switch (sortBy) {
    case "popularity.desc":
      return sortedMovies.sort(
        (a, b) => (b.popularity || 0) - (a.popularity || 0)
      );

    case "popularity.asc":
      return sortedMovies.sort(
        (a, b) => (a.popularity || 0) - (b.popularity || 0)
      );

    case "vote_average.desc":
      return sortedMovies.sort(
        (a, b) => (b.vote_average || 0) - (a.vote_average || 0)
      );

    case "vote_average.asc":
      return sortedMovies.sort(
        (a, b) => (a.vote_average || 0) - (b.vote_average || 0)
      );

    case "primary_release_date.desc":
      return sortedMovies.sort((a, b) =>
        (b.release_date || "").localeCompare(a.release_date || "")
      );

    case "primary_release_date.asc":
      return sortedMovies.sort((a, b) =>
        (a.release_date || "").localeCompare(b.release_date || "")
      );

    default:
      return sortedMovies;
  }
}

