export interface Movie {
  id: number;
  title: string;
  poster: string | null;
  rating: number;
  year: string;
  genres: string[];
}

export interface MovieDetails extends Movie {
  overview: string;
  cast: CastMember[];
  directors: string[];
  trailer: string | null;
  runtime: number;
  tagline?: string;
  backdrop?: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface SearchResponse {
  results: Movie[];
  query: string;
}
