export interface Pokemon {
  id: number;
  name: string;
  detail_url: string;
  image_url: string;
}

export interface PokemonApiResponse {
  total: number;
  next_page: string | null;
  prev_page: string | null;
  items: Pokemon[];
}

export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}
