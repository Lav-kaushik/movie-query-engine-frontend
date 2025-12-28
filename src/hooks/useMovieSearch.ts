import { useState, useCallback } from "react";
import { Movie } from "@/types/movie";
import { searchMovies } from "@/lib/api";

export function useMovieSearch() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setMovies([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setMovies([]);
    setError(null);
    setHasSearched(false);
  }, []);

  return {
    movies,
    isLoading,
    error,
    hasSearched,
    search,
    clearSearch,
  };
}
