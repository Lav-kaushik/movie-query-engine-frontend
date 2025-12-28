import { useState, FormEvent, useRef, useEffect } from "react";
import { Search, X, Sparkles } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const EXAMPLE_QUERIES = [
  "Mind-bending sci-fi like Inception",
  "90s action movies with Keanu Reeves",
  "Something light and funny for date night",
  "Movies where someone forgets their memory",
  "Christopher Nolan films",
];

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleExampleClick = (example: string) => {
    setQuery(example);
    onSearch(example);
  };

  const clearQuery = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !isFocused) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFocused]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`
            relative flex items-center rounded-2xl transition-all duration-300
            ${isFocused 
              ? "bg-secondary ring-2 ring-primary/50 shadow-lg" 
              : "bg-secondary/80 hover:bg-secondary"
            }
          `}
        >
          <div className="absolute left-5 text-muted-foreground">
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search movies with natural language..."
            className="
              w-full py-4 pl-14 pr-24 bg-transparent
              text-foreground placeholder:text-muted-foreground
              focus:outline-none text-lg
            "
          />

          <div className="absolute right-3 flex items-center gap-2">
            {query && (
              <button
                type="button"
                onClick={clearQuery}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              disabled={!query.trim() || isLoading}
              className="
                px-4 py-2 rounded-xl bg-primary text-primary-foreground
                font-medium text-sm
                hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200
              "
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {/* Example queries */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-primary mr-1" />
        <span className="text-sm text-muted-foreground">Try:</span>
        {EXAMPLE_QUERIES.slice(0, 3).map((example) => (
          <button
            key={example}
            onClick={() => handleExampleClick(example)}
            className="
              px-3 py-1.5 text-sm rounded-full
              bg-muted/50 text-muted-foreground
              hover:bg-muted hover:text-foreground
              transition-all duration-200
            "
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
}
