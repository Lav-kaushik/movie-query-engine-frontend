import { Film, Sparkles, Zap } from "lucide-react";

export function Hero() {
  return (
    <div className="relative text-center py-12 md:py-20">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      {/* Logo */}
      <div className="relative inline-flex items-center justify-center mb-6">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse-glow" />
        <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/60 shadow-lg">
          <Film className="w-10 h-10 text-primary-foreground" />
        </div>
      </div>

      {/* Title */}
      <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wide mb-4 fade-in">
        Movie Query
        <span className="text-gradient"> Engine</span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 fade-in" style={{ animationDelay: "100ms" }}>
        Search movies using natural language. Describe a plot, mood, or memory 
        — our AI understands what you're looking for.
      </p>

      {/* Features */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground fade-in" style={{ animationDelay: "200ms" }}>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span>AI-Powered Search</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          <span>Instant Results</span>
        </div>
        <div className="flex items-center gap-2">
          <Film className="w-4 h-4 text-primary" />
          <span>Rich Movie Details</span>
        </div>
      </div>
    </div>
  );
}
