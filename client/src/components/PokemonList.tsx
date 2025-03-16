import { useEffect, useState } from "react"
import { Pokemon } from "@/lib/types"
import { PokemonCard } from "./PokemonCard"
import { config } from "@/config/env"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function PokemonList() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const pageSize = 20

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          `${config.apiUrl}/pokemon?page=${currentPage}&pageSize=${pageSize}`
        )
        
        if (!response.ok) {
          throw new Error(`Failed to fetch Pokemon: ${response.statusText}`)
        }
        
        const rawData = await response.json()
        
        if (!rawData || !Array.isArray(rawData.items)) {
          throw new Error("Invalid API response format")
        }

        setPokemon(rawData.items)
        setTotalPages(Math.ceil(rawData.total / pageSize))
      } catch (err) {
        console.error("Error fetching pokemon:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch Pokemon")
        setPokemon([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchPokemon()
  }, [currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background px-4 py-8 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">Pokédex</h1>
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background px-4 py-8 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">Pokédex</h1>
          <div className="flex items-center justify-center min-h-[400px] text-destructive">
            {error}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">Pokédex</h1>
        {pokemon && pokemon.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {pokemon.map((p) => (
                <PokemonCard key={p.id} pokemon={p} />
              ))}
            </div>

            <Pagination className="mt-8">
              <PaginationContent className="gap-1">
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'} 
                      border-0 bg-card hover:bg-accent text-foreground`}
                  />
                </PaginationItem>

                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => handlePageChange(page)}
                          isActive={currentPage === page}
                          className={`cursor-pointer border-0 ${
                            currentPage === page
                              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                              : 'bg-card text-foreground hover:bg-accent'
                          }`}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  }
                  if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationEllipsis className="text-muted-foreground" />
                      </PaginationItem>
                    )
                  }
                  return null
                })}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      border-0 bg-card hover:bg-accent text-foreground`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        ) : (
          <div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
            No Pokémon found
          </div>
        )}
      </div>
    </div>
  )
} 
