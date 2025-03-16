export const config = {
  apiUrl: import.meta.env.VITE_API_URL,
} as const;

export type Config = typeof config;
