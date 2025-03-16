export const config = {
  apiUrl: import.meta.env.VITE_API_URL,
} as const;

// Type-safe way to access environment variables
export type Config = typeof config;
