import { useQuery } from "@tanstack/react-query";
import { pokemonRepository } from "@/lib/repositories/pokemon.repository";
import {
  Pokemon,
  PokemonListParams,
  PokemonResponse,
} from "@/lib/types/pokemon.types";

export const pokemonKeys = {
  all: ["pokemon"] as const,
  lists: () => [...pokemonKeys.all, "list"] as const,
  list: (params: PokemonListParams) =>
    [...pokemonKeys.lists(), params] as const,
  details: () => [...pokemonKeys.all, "detail"] as const,
  detail: (id: number) => [...pokemonKeys.details(), id] as const,
};

export function usePokemonList(params: PokemonListParams = {}) {
  return useQuery<PokemonResponse>({
    queryKey: pokemonKeys.list(params),
    queryFn: () => pokemonRepository.getPokemonList(params),
  });
}

export function usePokemonDetail(id: number) {
  return useQuery<Pokemon>({
    queryKey: pokemonKeys.detail(id),
    queryFn: () => pokemonRepository.getPokemonById(id),
    enabled: !!id,
  });
}
