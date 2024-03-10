import Genre from "../../../domain/Genre.entity";

export type ItemResponse = Genre;
export type CollectionResponse = {
  data: Array<ItemResponse>;
  meta: {
    currentPage: number;
    lasPage: number;
    perPage: number;
    total: number;
  };
};

export default interface GenreGateway {
  list(): Promise<CollectionResponse>;
  create(body: BodyCreate): Promise<ItemResponse>;
  find(id: string): Promise<ItemResponse>;
  update(id: string, body: BodyUpdate): Promise<ItemResponse>;
  destroy(id: string): Promise<void>;
}

export type BodyCreate = {
  name: string;
  categoriesId: Array<string>;
};

export type BodyUpdate = {
  name: string;
  categoriesId: Array<string>;
};
