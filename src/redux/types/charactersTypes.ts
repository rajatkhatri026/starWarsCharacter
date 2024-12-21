export interface Character {
    name: string;
    height: string;
    mass: string;
    birth_year: string;
    films: string[];
    species: string;
    homeworld: string;
    url: string;
    homeworldName: string;
}
  
export interface CharactersState {
    data: Character[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    hasMore: boolean;
}
  
// Update the API response interface to match the actual response
export interface APIResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Character[];
  }