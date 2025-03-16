import { config } from "@/config/env";
import { Pokemon } from "./types";

export interface PaginatedResponse<T> {
  total: number;
  next_page: string | null;
  prev_page: string | null;
  items: T[];
}

export interface GetPokemonListParams {
  page?: number;
  pageSize?: number;
}

export const api = {
  getPokemonList: async ({
    page = 1,
    pageSize = 20,
  }: GetPokemonListParams = {}) => {
    const response = await fetch(
      `${config.apiUrl}/pokemon?page=${page}&pageSize=${pageSize}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Pokemon");
    }
    return response.json() as Promise<PaginatedResponse<Pokemon>>;
  },

  getPokemonById: async (id: number) => {
    const response = await fetch(`${config.apiUrl}/pokemon/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch Pokemon details");
    }
    return response.json() as Promise<Pokemon>;
  },
};
