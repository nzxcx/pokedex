import { useState } from "react"
import { PokemonCard } from "./pokemon-card"
import { usePokemonList } from "@/hooks/usePokemon"
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
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 20

  const { data, isLoading, isError, error } = usePokemonList({
    page: currentPage,
    pageSize,
  })

  const totalPages = data ? Math.ceil(data.total / pageSize) : 0

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

  if (isError) {
    return (
      <div className="min-h-screen bg-background px-4 py-8 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">Pokédex</h1>
          <div className="flex items-center justify-center min-h-[400px] text-destructive">
            {error instanceof Error ? error.message : "Failed to fetch Pokemon"}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">Pokédex</h1>
        {data?.items && data.items.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {data.items.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>

            <Pagination className="mt-8">
              <PaginationContent className="gap-1">
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={`${
                      currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                    } border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors`}
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
                          className={`cursor-pointer transition-colors ${
                            currentPage === page
                              ? 'bg-accent text-accent-foreground font-medium'
                              : 'border border-border bg-background hover:bg-accent hover:text-accent-foreground'
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
                    className={`${
                      currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                    } border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors`}
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
