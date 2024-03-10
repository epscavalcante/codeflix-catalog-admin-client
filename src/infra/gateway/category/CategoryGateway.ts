import Category from "../../../domain/Category.entity";

export type ItemResponse = Category;
export type CollectionResponse = {
  data: Array<ItemResponse>;
  meta: {
    currentPage: number;
    lasPage: number;
    perPage: number;
    total: number;
  };
};

export default interface CategoryGateway {
  list(): Promise<CollectionResponse>;
  create(body: BodyCreate): Promise<ItemResponse>;
  find(id: string): Promise<ItemResponse>;
  update(id: string, body: BodyUpdate): Promise<ItemResponse>;
  destroy(id: string): Promise<void>;
}

export type BodyCreate = {
  name: string;
  description: string | null;
  isActive: boolean;
};

export type BodyUpdate = {
  name: string;
  description: string | null;
  isActive: boolean;
};
