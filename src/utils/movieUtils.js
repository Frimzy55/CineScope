
export const getReleaseYear = (releaseDate) => {
  if (!releaseDate) {
    return "N/A";
  }

  return releaseDate.slice(0, 4);
};

export const formatRuntime = (runtime) => {
  if (!runtime || runtime <= 0) {
    return "N/A";
  }

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  if (hours === 0) {
    return `${minutes} min`;
  }

  if (minutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}m`;
};

export const formatRating = (rating) => {
  const numericRating = Number(rating);

  if (!Number.isFinite(numericRating)) {
    return "N/A";
  }

  return numericRating.toFixed(1);
};

export const getPosterUrl = (
  posterPath,
  size = "w500"
) => {
  if (!posterPath) {
    return null;
  }

  return `https://image.tmdb.org/t/p/${size}${posterPath}`;
};

export const getProfileImageUrl = (profilePath) => {
  if (!profilePath) {
    return null;
  }

  return `https://image.tmdb.org/t/p/w185${profilePath}`;
};

export const filterMoviesByGenres = (movies, selectedGenres) => {
  if (!selectedGenres?.length) {
    return movies;
  }

  return movies.filter((movie) =>
    selectedGenres.every((genreId) =>
      movie.genre_ids?.includes(genreId)
    )
  );
};

export const sortMovies = (movies, sortBy) => {
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
};

