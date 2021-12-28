const BASE_PATH = "https://api.themoviedb.org/3";

export function getMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_KEY}`
  ).then((response) => response.json());
}
