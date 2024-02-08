import Category from "../../domain/Category.entity";
import HttpClient from "./HttpClient";

export default class MemoryHttpAdapter implements HttpClient {
  categories: Category[] = [
    {
      id: "a1",
      name: "Cat 1",
      description: null,
      isActive: true,
      createdAt: new Date(),
    },
    {
      id: "a2",
      name: "Cat 2",
      description: null,
      isActive: true,
      createdAt: new Date(),
    },
    {
      id: "a3",
      name: "Cat 3",
      description: null,
      isActive: true,
      createdAt: new Date(),
    },
    {
      id: "a4",
      name: "Cat 4",
      description: null,
      isActive: true,
      createdAt: new Date(),
    },
    {
      id: "a5",
      name: "Cat 5",
      description: null,
      isActive: true,
      createdAt: new Date(),
    },
  ];

  get(url: string): Promise<any> {
    return new Promise((resolve) => resolve(this.categories));
  }
  post(url: string, body: any): Promise<Category> {
    const createdAt = new Date();
    const id = crypto.randomUUID();
    const category = new Category(
      body.name,
      body.description,
      body.isActive,
      new Date(createdAt),
      id
    );
    this.categories.push(category);
    return Promise.resolve(category);
  }
}
