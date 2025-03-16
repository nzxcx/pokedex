export interface PaginatedResponse<T> {
  total: number;
  next_page: string | null;
  prev_page: string | null;
  items: T[];
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}
