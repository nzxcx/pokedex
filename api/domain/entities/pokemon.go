package entities

// Pokemon représente l'entité métier d'un Pokémon
type Pokemon struct {
	ID      int            `json:"id"`
	Name    string         `json:"name"`
	Types   []string       `json:"types"`  // Simplifié : juste les noms des types
	Height  float64        `json:"height"` // En mètres
	Weight  float64        `json:"weight"` // En kilogrammes
	Sprites PokemonSprites `json:"sprites"`
}

// PokemonSprites contient les URLs des images du Pokémon
type PokemonSprites struct {
	FrontImage string `json:"front_image"`
	BackImage  string `json:"back_image"`
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
