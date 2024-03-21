export type Pagination<T> = {
  data: Array<T>;
  meta: {
    currentPage: number;
    lasPage: number;
    perPage: number;
    total: number;
  };
};