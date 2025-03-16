import { config } from "@/config/env";
import {
  Pokemon,
  PokemonResponse,
  PokemonListParams,
} from "@/lib/types/pokemon.types";

class PokemonRepository {
  private baseUrl = config.apiUrl;

  async getPokemonList({ page = 1, pageSize = 20 }: PokemonListParams = {}) {
    const response = await fetch(
      `${this.baseUrl}/pokemon?page=${page}&pageSize=${pageSize}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Pokemon list");
    }
    return response.json() as Promise<PokemonResponse>;
  }

  async getPokemonById(id: number) {
    const response = await fetch(`${this.baseUrl}/pokemon/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch Pokemon details");
    }
    return response.json() as Promise<Pokemon>;
  }
}

// export singleton instance
export const pokemonRepository = new PokemonRepository();
