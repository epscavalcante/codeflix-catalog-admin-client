import Category from "./Category.entity";

export default interface CategoryService {
  // usar um Generic de paginação
  getCategories(): Promise<Category[]>;
}
