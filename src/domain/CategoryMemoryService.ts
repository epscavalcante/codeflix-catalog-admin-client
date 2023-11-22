import Category from "./Category.entity";
import CategoryService from "./CategoryService.interface";

export default class CategoryMemoryService implements CategoryService {
  categories: Category[] = [
    new Category({
      id: "a1",
      name: "Cat 1",
      isActive: true,
      createdAt: new Date().toISOString(),
    }),
    new Category({
      id: "a2",
      name: "Cat 2",
      isActive: true,
      createdAt: new Date().toISOString(),
    }),
    new Category({
      id: "a3",
      name: "Cat 3",
      isActive: true,
      createdAt: new Date().toISOString(),
    }),
    new Category({
      id: "a4",
      name: "Cat 4",
      isActive: true,
      createdAt: new Date().toISOString(),
    }),
    new Category({
      id: "a5",
      name: "Cat 5",
      isActive: true,
      createdAt: new Date().toISOString(),
    }),
  ];

  async getCategories(): Promise<Category[]> {
    return Promise.resolve(this.categories);
  }
}
