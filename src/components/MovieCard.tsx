import { Movie } from "@/types/movie";
import { getPosterUrl } from "@/lib/api";
import { Star } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
  index: number;
}

export function MovieCard({ movie, onClick, index }: MovieCardProps) {
  return (
    <button
      onClick={onClick}
      className="
        group relative flex flex-col text-left
        rounded-xl overflow-hidden card-glow
        bg-card border border-border/30
        focus:outline-none focus:ring-2 focus:ring-primary/50
        fade-in
      "
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden bg-muted">
        <img
          src={getPosterUrl(movie.poster_url, "w500")}
          alt={movie.title}
          className="
            w-full h-full object-cover
            transition-transform duration-500 ease-out
            group-hover:scale-110
          "
          loading="lazy"
        />
        
        {/* Gradient overlay */}
        <div className="
          absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
        " />

        {/* Rating badge */}
        {movie.rating > 0 && (
          <div className="
            absolute top-3 right-3 flex items-center gap-1
            px-2 py-1 rounded-lg
            bg-background/80 backdrop-blur-sm
            text-sm font-semibold
          ">
            <Star className="w-3.5 h-3.5 text-primary fill-primary" />
            <span>{movie.rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <h3 className="
          font-display text-xl leading-tight
          line-clamp-2
          group-hover:text-primary transition-colors duration-200
        ">
          {movie.title}
        </h3>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{movie.release_year}</span>
          {movie.genre?.length > 0 && (
            <span className="text-xs truncate max-w-[60%]">
              {movie.genre.slice(0, 2).join(" • ")}
            </span>
          )}
        </div>
      </div>

      {/* Hover indicator */}
      <div className="
        absolute bottom-0 left-0 right-0 h-1
        bg-gradient-to-r from-primary to-primary/50
        transform scale-x-0 group-hover:scale-x-100
        transition-transform duration-300 origin-left
      " />
    </button>
  );
}
