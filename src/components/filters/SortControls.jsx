
const SORT_OPTIONS = [
  {
    value: "popularity.desc",
    label: "Popularity",
    direction: "High to Low",
  },
  {
    value: "popularity.asc",
    label: "Popularity",
    direction: "Low to High",
  },
  {
    value: "vote_average.desc",
    label: "Rating",
    direction: "High to Low",
  },
  {
    value: "vote_average.asc",
    label: "Rating",
    direction: "Low to High",
  },
  {
    value: "primary_release_date.desc",
    label: "Release Date",
    direction: "Newest First",
  },
  {
    value: "primary_release_date.asc",
    label: "Release Date",
    direction: "Oldest First",
  },
];

export default function SortControls({
  sortBy = "popularity.desc",
  onSortChange,
}) {
  return (
    <div className="sort-controls">
      <label htmlFor="movie-sort" className="sort-label">
        Sort by
      </label>

      <select
        id="movie-sort"
        className="sort-select"
        value={sortBy}
        onChange={(event) => onSortChange(event.target.value)}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label} — {option.direction}
          </option>
        ))}
      </select>
    </div>
  );
}

