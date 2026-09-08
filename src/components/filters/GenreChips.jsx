
export default function GenreChips({
  genres = [],
  selectedGenres = [],
  onGenreToggle,
}) {
  const handleGenreClick = (genreId) => {
    onGenreToggle(genreId);
  };

  return (
    <section className="genre-section" aria-label="Movie genres">
      <div className="genre-chips">
        {genres.map((genre) => {
          const isSelected = selectedGenres.includes(genre.id);

          return (
            <button
              key={genre.id}
              type="button"
              className={`genre-chip ${isSelected ? "selected" : ""}`}
              onClick={() => handleGenreClick(genre.id)}
              aria-pressed={isSelected}
            >
              {genre.name}
            </button>
          );
        })}
      </div>
    </section>
  );
}

