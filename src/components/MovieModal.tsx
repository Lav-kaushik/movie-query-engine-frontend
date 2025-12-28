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
            {/* Backdrop
                <div className="relative h-72 md:h-96 overflow-hidden">
                  <img
                    src={movie.poster_url}
                    alt={movie.title}
                    className="absolute inset-0 w-full h-full object-cover blur-sm scale-110"
                  />

                  <div className="absolute inset-0 bg-black/60" />

                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full
                              bg-black/50 hover:bg-black/70 transition"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div> */}
            

            {/* Content */}
            <div className="relative px-6 pb-8 mt-8">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Poster */}
                <div className="flex-shrink-0 w-40 md:w-48">
                  <img
                    src={getPosterUrl(movie.poster_url, "w500")}
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

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
                    <span className="text-muted-foreground">{movie.release_year}</span>
                    
                    {movie.rating > 0 && (
                      <span className="flex items-center gap-1 font-semibold">
                        <Star className="w-4 h-4 text-primary fill-primary" />
                        {movie.rating.toFixed(1)}
                      </span>
                    )}
                  </div>

                  {/* Genres */}
                  {movie.genre?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {movie.genre.map((genre) => (
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
                  <div className="flex flex-wrap gap-2">
                    {movie.cast.slice(0, 10).map((name, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 rounded-full bg-secondary text-secondary-foreground text-sm"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {/* Trailer*/}
            {movie.trailer_url && (
              <div className="px-6 mt-8">
                <h3 className="font-display text-2xl mb-4">Trailer</h3>
                <div className="mx-auto max-w-3xl aspect-video rounded-xl overflow-hidden bg-black shadow-lg">
                  <iframe
                    src={getEmbedUrl(movie.trailer_url)}
                    title={`${movie.title} Trailer`}
                    className="w-full h-full"
                    allowFullScreen
                  />
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

const getEmbedUrl = (url: string) => {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

