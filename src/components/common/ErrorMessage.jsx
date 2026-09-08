
export default function ErrorMessage({
  message = "Something went wrong. Please try again.",
  onRetry,
}) {
  return (
    <div className="error-message" role="alert">
      <div className="error-icon" aria-hidden="true">
        !
      </div>

      <div className="error-content">
        <h3>Something went wrong</h3>
        <p>{message}</p>

        {onRetry && (
          <button
            type="button"
            className="error-retry-button"
            onClick={onRetry}
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

