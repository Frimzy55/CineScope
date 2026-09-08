
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w185";

export default function CastList({ cast = [] }) {
  const visibleCast = cast.filter((person) => person.profile_path).slice(0, 20);

  if (visibleCast.length === 0) {
    return (
      <section className="cast-section">
        <h3>Cast</h3>
        <p className="cast-empty">No cast information available.</p>
      </section>
    );
  }

  return (
    <section className="cast-section">
      <h3>Cast</h3>

      <div className="cast-list">
        {visibleCast.map((person) => (
          <article className="cast-card" key={person.credit_id || person.id}>
            <img
              src={`${IMAGE_BASE_URL}${person.profile_path}`}
              alt={person.name}
              className="cast-image"
              loading="lazy"
            />

            <h4 className="cast-name">{person.name}</h4>

            <p className="cast-character">
              {person.character || "Unknown character"}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

