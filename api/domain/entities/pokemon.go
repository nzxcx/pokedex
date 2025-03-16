package entities

type Pokemon struct {
	ID      int            `json:"id"`
	Name    string         `json:"name"`
	Types   []string       `json:"types"` 
	Height  float64        `json:"height"`
	Weight  float64        `json:"weight"` 
	Sprites PokemonSprites `json:"sprites"`
}

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
