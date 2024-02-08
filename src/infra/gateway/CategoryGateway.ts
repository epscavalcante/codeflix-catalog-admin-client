import Category from "../../domain/Category.entity";

export type ItemResponse = Category;
export type CollectionResponse = {
  data: Array<ItemResponse>,
  meta: {
    currentPage: number,
    lasPage: number,
    perPage: number,
    total: number,
  }
}

export default interface CategoryGateway {
    list(): Promise<CollectionResponse>;
    create(params: {name: string, description: string | null, isActive: boolean}): Promise<ItemResponse>;
}
