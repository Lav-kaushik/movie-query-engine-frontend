import { Movie } from "@/types/movie";
import { MovieCard } from "./MovieCard";
import { Film, SearchX } from "lucide-react";

interface MovieGridProps {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
  onMovieClick: (movie: Movie) => void;
}

export function MovieGrid({ movies, isLoading, error, hasSearched, onMovieClick }: MovieGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="space-y-4 fade-in" style={{ animationDelay: `${i * 50}ms` }}>
            <div className="aspect-[2/3] rounded-xl shimmer" />
            <div className="space-y-2">
              <div className="h-5 w-3/4 rounded shimmer" />
              <div className="h-4 w-1/2 rounded shimmer" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center fade-in">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
          <SearchX className="w-8 h-8 text-destructive" />
        </div>
        <h3 className="font-display text-2xl mb-2">Something went wrong</h3>
        <p className="text-muted-foreground max-w-md">{error}</p>
      </div>
    );
  }

  if (hasSearched && movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center fade-in">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Film className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="font-display text-2xl mb-2">No movies found</h3>
        <p className="text-muted-foreground max-w-md">
          Try a different search query or be more specific about what you're looking for.
        </p>
      </div>
    );
  }

  if (movies.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          index={index}
          onClick={() => onMovieClick(movie)}
        />
      ))}
    </div>
  );
}
