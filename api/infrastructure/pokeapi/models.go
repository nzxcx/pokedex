package pokeapi

type ListPokemonResponse struct {
	Count    int    `json:"count"`
	Next     string `json:"next"`
	Previous string `json:"previous"`
	Results  []struct {
		Name string `json:"name"`
		ID   int    `json:"id"`
		URL  string `json:"url"`
	} `json:"results"`
}

type PokemonResponse struct {
	ID      int     `json:"id"`
	Name    string  `json:"name"`
	Types   []Type  `json:"types"`
	Height  int     `json:"height"`
	Weight  int     `json:"weight"`
	Sprites Sprites `json:"sprites"`
}

type Type struct {
	Slot int `json:"slot"`
	Type struct {
		Name string `json:"name"`
		URL  string `json:"url"`
	} `json:"type"`
}

type Sprites struct {
	FrontDefault string `json:"front_default"`
	BackDefault  string `json:"back_default"`
} 
