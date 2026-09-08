export default function MovieSkeleton() {
  return (
    <article className="movie-card movie-skeleton" aria-hidden="true">
      <div className="movie-poster-wrapper">
        <div className="skeleton-poster" />
      </div>

      <div className="movie-card-content">
        <div className="skeleton-title" />
        <div className="skeleton-year" />
      </div>
    </article>
  );
}