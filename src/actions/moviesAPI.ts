const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

export async function getMovieByID(id: string) {
  const res = await fetch(
    `${API_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`
  );
  const data = await res.json();
  return data;
}
export async function getPopularMovies(limit: number) {
  const res = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results.slice(0, limit);
}
export async function getTopRatedMovies(limit: number) {
  const res = await fetch(`${API_URL}/movie/top_rated?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results.slice(0, limit);
}
export async function getNowPlayingMovies(limit: number) {
  const res = await fetch(`${API_URL}/movie/now_playing?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results.slice(0, limit);
}
export async function getRecommendationsMovies(limit: number, id: string) {
  const res = await fetch(
    `${API_URL}/movie/${id}/recommendations?api_key=${API_KEY}`
  );
  const data = await res.json();
  return data.results.slice(0, limit);
}
export async function getPerson(id: string) {
  const res = await fetch(`${API_URL}/person/${id}?api_key=${API_KEY}`);
  const data = await res.json();
  return data;
}
export async function getPersonMovies(id: string) {
  const res = await fetch(
    `${API_URL}/person/${id}/movie_credits?api_key=${API_KEY}`
  );
  const data = await res.json();
  return data;
}
export async function searchMovies(name: string | string[] | undefined) {
  const res = await fetch(
    `${API_URL}/search/movie?query=${name}&api_key=${API_KEY}`
  );
  const data = await res.json();
  return data;
}
