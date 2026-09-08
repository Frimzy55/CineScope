
import { Link } from "react-router-dom";

export default function EmptyState({
  title = "Nothing here yet",
  message = "There are no movies to display.",
  actionLabel,
  actionTo,
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon" aria-hidden="true">
        🎬
      </div>

      <h2>{title}</h2>

      <p>{message}</p>

      {actionLabel && actionTo && (
        <Link to={actionTo} className="empty-state-action">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

