package entities

type PaginatedPokemonList struct {
	Total    int             `json:"total"`
	NextPage *string         `json:"next_page"`
	PrevPage *string         `json:"prev_page"`
	Items    []PokemonListItem `json:"items"`
}

type PokemonListItem struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	DetailURL string `json:"detail_url"`
	ImageURL  string `json:"image_url"`
} 
