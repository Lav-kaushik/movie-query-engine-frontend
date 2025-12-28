import { useState, useCallback } from "react";
import { MovieDetails } from "@/types/movie";
import { getMovieDetails } from "@/lib/api";

export function useMovieDetails() {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = useCallback(async (movieId: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const details = await getMovieDetails(movieId);
      setMovie(details);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load movie details");
      setMovie(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearDetails = useCallback(() => {
    setMovie(null);
    setError(null);
  }, []);

  return {
    movie,
    isLoading,
    error,
    fetchDetails,
    clearDetails,
  };
}
