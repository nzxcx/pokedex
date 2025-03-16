export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  height: number;
  weight: number;
  sprites: {
    front_image: string;
    back_image: string;
  };
}

export interface PokemonListItem {
  id: number;
  name: string;
  detail_url: string;
  image_url: string;
}

export interface PokemonListParams {
  page?: number;
  pageSize?: number;
}
