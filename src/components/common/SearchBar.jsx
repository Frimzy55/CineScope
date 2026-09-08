
export default function SearchBar({ value, onChange, onClear }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <div className="search-input-wrapper">
        <span className="search-icon" aria-hidden="true">
          ⌕
        </span>

        <input
          type="search"
          value={value}
          onChange={handleChange}
          placeholder="Search for a movie..."
          aria-label="Search for a movie"
          className="search-input"
          autoComplete="off"
        />

        {value && (
          <button
            type="button"
            className="search-clear-button"
            onClick={onClear}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
    </form>
  );
}

