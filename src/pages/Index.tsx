import { useState } from "react";
import { Hero } from "@/components/Hero";
import { SearchBar } from "@/components/SearchBar";
import { MovieGrid } from "@/components/MovieGrid";
import { MovieModal } from "@/components/MovieModal";
import { useMovieSearch } from "@/hooks/useMovieSearch";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import { Movie } from "@/types/movie";

const Index = () => {
  const { movies, isLoading, error, hasSearched, search } = useMovieSearch();
  const { movie: movieDetails, isLoading: detailsLoading, error: detailsError, fetchDetails, clearDetails } = useMovieDetails();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMovieClick = (movie: Movie) => {
    setIsModalOpen(true);
    fetchDetails(movie.id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(clearDetails, 300);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background pattern */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative">
        {/* Header */}
        <header className="container px-4 pt-8 md:pt-12">
          <Hero />
        </header>

        {/* Search Section */}
        <section className="container px-4 py-8">
          <SearchBar onSearch={search} isLoading={isLoading} />
        </section>

        {/* Results Section */}
        <main className="container px-4 pb-16">
          {hasSearched && (
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                {movies.length > 0
                  ? `Found ${movies.length} movie${movies.length !== 1 ? "s" : ""}`
                  : ""}
              </p>
            </div>
          )}
          
          <MovieGrid
            movies={movies}
            isLoading={isLoading}
            error={error}
            hasSearched={hasSearched}
            onMovieClick={handleMovieClick}
          />
        </main>

        {/* Movie Modal */}
        <MovieModal
          movie={movieDetails}
          isLoading={detailsLoading}
          error={detailsError}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />

        {/* Footer */}
        <footer className="container px-4 py-8 border-t border-border/50">
          <p className="text-center text-sm text-muted-foreground">
            Powered by TMDB and Groq LLM
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
