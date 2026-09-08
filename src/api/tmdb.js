const BASE_URL = "https://api.themoviedb.org/3";


const API_KEY = process.env.REACT_APP_TMDB_KEY;

async function request(endpoint, params = {}) {
  const query = new URLSearchParams({
    api_key: API_KEY,
    language: "en-US",
    ...params,
  });

  const response = await fetch(
    `${BASE_URL}${endpoint}?${query}`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch movie data.");
  }

  return response.json();
}

export function getGenres() {
  return request("/genre/movie/list");
}

export function discoverMovies(params = {}) {
  return request("/discover/movie", params);
}

export function searchMovies(query, page = 1) {
  return request("/search/movie", {
    query,
    page,
    include_adult: false,
  });
}

export function getMovieDetails(id) {
  return request(`/movie/${id}`);
}

export function getMovieCredits(id) {
  return request(`/movie/${id}/credits`);
}

export function getMovieVideos(id) {
  return request(`/movie/${id}/videos`);
}