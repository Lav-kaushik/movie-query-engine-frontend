export interface Movie {
  id: number;
  title: string;
  poster_url: string | null;
  rating: number;
  release_year: number | null;
  genre: string[];
}

export interface MovieDetails extends Movie {
  overview: string;
  cast: string[];
  directors: string[];
  trailer_url: string | null;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface SearchResponse {
  result: Movie[];
}
