export interface PaginationOptions {
  page: number;
  name: string;
}

export interface PaginationResult<T> {
  total: number;
  count: number;
  page: number;
  pages: number;
  results: T;
}
