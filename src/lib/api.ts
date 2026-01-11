import { Movie, MovieDetails, SearchResponse } from "@/types/movie";

const API_BASE_URL = import.meta.env.VITE_API_URL == undefined;

export async function searchMovies(query: string): Promise<Movie[]> {
  if (!query.trim()) return [];
  
  const response = await fetch(
    `${API_BASE_URL}/api/search?query=${encodeURIComponent(query)}`
  );
  
  if (!response.ok) {
    throw new Error("Failed to search movies");
  }
  
  const data: SearchResponse | Movie[] = await response.json();
  
  // Handle both response formats
  if (Array.isArray(data)) {
    return data;
  }
  
  return data.result || [];
}

export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
  const response = await fetch(`${API_BASE_URL}/api/movies/${movieId}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }
  
  return response.json();
}

export function getPosterUrl(posterPath: string | null, size: "w185" | "w342" | "w500" | "w780" | "original" = "w500"): string {
  if (!posterPath) {
    return "/placeholder.svg";
  }
  
  // If it's already a full URL, return it
  if (posterPath.startsWith("http")) {
    return posterPath;
  }
  
  return `https://image.tmdb.org/t/p/${size}${posterPath}`;
}

export function getBackdropUrl(backdropPath: string | null): string {
  if (!backdropPath) {
    return "";
  }
  
  if (backdropPath.startsWith("http")) {
    return backdropPath;
  }
  
  return `https://image.tmdb.org/t/p/original${backdropPath}`;
}
