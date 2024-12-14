import axios from "axios";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmNlM2EzNTVhMTU5MTc2OTZiZGVjOTA5NzUwZWYzMSIsIm5iZiI6MTczNDEyMDE1Ny43NDQsInN1YiI6IjY3NWM5MmRkZjFiZjk2ZGMyNDc3ZjcyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I3wGuTyNvpNHVYMTtrBWcg3Q7_TsWL7GSWGgFkXwTs0";
axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.headers.common["Authorization"] = "Bearer  " + ACCESS_TOKEN;

export const DEFAULT_PER_PAGE = 10;

export const searchPhotos = async (query, page) => {
  const params = new URLSearchParams();
  params.append("query", query);
  params.append("page", page);

  const response = await axios.get("search/photos", { params });
  return response.data;
};

export const getTodayTrendyMovies = async () => {
  const response = await axios.get("trending/movie/day");
  return response.data;
};

export const getConfiguration = async () => {
  const response = await axios.get("configuration");
  return response.data;
};

export const getMovieDetails = async (id) => {
  const response = await axios.get("movie/" + id);
  return response.data;
};

export const getMovieCredits = async (id) => {
  const response = await axios.get(`movie/${id}/credits`);
  return response.data;
};

export const getMovieReviews = async (id) => {
  const response = await axios.get(`movie/${id}/reviews`);
  return response.data;
};

export const searchMovies = async (query) => {
  const params = new URLSearchParams();
  params.append("query", query);
  const response = await axios.get("search/movie", { params });
  return response.data;
};

export const buildImageUrl = (logo, size = "original") => {
  return `https://image.tmdb.org/t/p/${size}/${logo}`;
};
