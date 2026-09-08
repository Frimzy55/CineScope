import MovieCard from "./MovieCard";

export default function MovieGrid({ movies, onSelect }) {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}