package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Server   ServerConfig
	PokeAPI  PokeAPIConfig
}

type ServerConfig struct {
	Host string
	Port string
}

type PokeAPIConfig struct {
	BaseURL string
}

func Load() (*Config, error) {
	if err := godotenv.Load(); err != nil {
		return nil, fmt.Errorf("error loading .env file: %w", err)
	}

	return &Config{
		Server: ServerConfig{
			Host: getEnvOrDefault("SERVER_HOST", "localhost"),
			Port: getEnvOrDefault("SERVER_PORT", "8080"),
		},
		PokeAPI: PokeAPIConfig{
			BaseURL: getEnvOrDefault("POKEAPI_BASE_URL", "https://pokeapi.co/api/v2"),
		},
	}, nil
}

func getEnvOrDefault(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}

func (c *Config) GetServerAddress() string {
	return fmt.Sprintf("%s:%s", c.Server.Host, c.Server.Port)
} 
