import { useEffect } from "react";
import { MovieDetails, CastMember } from "@/types/movie";
import { getPosterUrl, getBackdropUrl } from "@/lib/api";
import { X, Star, Clock, Play, ExternalLink, User } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface MovieModalProps {
  movie: MovieDetails | null;
  isLoading: boolean;
  error: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MovieModal({ movie, isLoading, error, isOpen, onClose }: MovieModalProps) {
  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden bg-card border-border/50">
        <VisuallyHidden>
          <DialogTitle>{movie?.title || "Movie Details"}</DialogTitle>
        </VisuallyHidden>
        
        {isLoading && (
          <div className="flex items-center justify-center py-32">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-32 text-center px-6">
            <p className="text-destructive font-medium">{error}</p>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
            >
              Close
            </button>
          </div>
        )}

        {movie && !isLoading && !error && (
          <div className="overflow-y-auto max-h-[90vh]">
            {/* Backdrop */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              {movie.backdrop ? (
                <img
                  src={getBackdropUrl(movie.backdrop)}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-secondary to-muted" />
              )}
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="
                  absolute top-4 right-4 p-2 rounded-full
                  bg-background/80 backdrop-blur-sm
                  hover:bg-background transition-colors
                "
              >
                <X className="w-5 h-5" />
              </button>

              {/* Trailer button */}
              {movie.trailer && (
                <a
                  href={movie.trailer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    absolute bottom-6 right-6 flex items-center gap-2
                    px-5 py-3 rounded-xl
                    bg-primary text-primary-foreground font-semibold
                    hover:bg-primary/90 transition-all
                    shadow-lg hover:shadow-xl hover:scale-105
                  "
                >
                  <Play className="w-5 h-5 fill-current" />
                  Watch Trailer
                </a>
              )}
            </div>

            {/* Content */}
            <div className="relative px-6 pb-8 -mt-20">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Poster */}
                <div className="flex-shrink-0 w-40 md:w-48">
                  <img
                    src={getPosterUrl(movie.poster, "w500")}
                    alt={movie.title}
                    className="w-full rounded-xl shadow-2xl"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 pt-16 md:pt-20">
                  {/* Title */}
                  <h2 className="font-display text-4xl md:text-5xl leading-tight mb-2">
                    {movie.title}
                  </h2>

                  {/* Tagline */}
                  {movie.tagline && (
                    <p className="text-primary italic mb-4">{movie.tagline}</p>
                  )}

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
                    <span className="text-muted-foreground">{movie.year}</span>
                    
                    {movie.runtime > 0 && (
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {formatRuntime(movie.runtime)}
                      </span>
                    )}
                    
                    {movie.rating > 0 && (
                      <span className="flex items-center gap-1 font-semibold">
                        <Star className="w-4 h-4 text-primary fill-primary" />
                        {movie.rating.toFixed(1)}
                      </span>
                    )}
                  </div>

                  {/* Genres */}
                  {movie.genres?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {movie.genres.map((genre) => (
                        <span
                          key={genre}
                          className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Overview */}
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {movie.overview || "No overview available."}
                  </p>

                  {/* Directors */}
                  {movie.directors?.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                        {movie.directors.length > 1 ? "Directors" : "Director"}
                      </h4>
                      <p>{movie.directors.join(", ")}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Cast */}
              {movie.cast?.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-display text-2xl mb-4">Cast</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {movie.cast.slice(0, 10).map((person) => (
                      <CastCard key={person.id} person={person} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function CastCard({ person }: { person: CastMember }) {
  const profileUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
    : null;

  return (
    <div className="flex flex-col items-center text-center p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
      {profileUrl ? (
        <img
          src={profileUrl}
          alt={person.name}
          className="w-16 h-16 rounded-full object-cover mb-2"
          loading="lazy"
        />
      ) : (
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-2">
          <User className="w-8 h-8 text-muted-foreground" />
        </div>
      )}
      <p className="font-medium text-sm line-clamp-1">{person.name}</p>
      <p className="text-xs text-muted-foreground line-clamp-1">{person.character}</p>
    </div>
  );
}
