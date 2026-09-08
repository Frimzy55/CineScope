
export default function RatingBadge({ rating }) {
  const numericRating = Number(rating);

  if (!Number.isFinite(numericRating)) {
    return <span className="rating-badge rating-unavailable">N/A</span>;
  }

  return (
    <span
      className="rating-badge"
      aria-label={`Rating ${numericRating.toFixed(1)} out of 10`}
    >
      ★ {numericRating.toFixed(1)}
    </span>
  );
}
