import Category from "../../../domain/Category.entity";
import HttpClient from "../../http/HttpClient";
import { Pagination } from "../../http/Response";
import CategoryGateway, { BodyCreate, BodyUpdate } from "./CategoryGateway";

export default class CategoryGatewayHttp implements CategoryGateway {
  constructor(readonly httpClient: HttpClient) {}

  async list(): Promise<Pagination<Category>> {
    const response = await this.httpClient.get("/categories");

    return {
      meta: response.meta,
      data: response.data.map(
        (responseItem: any) =>
          new Category(
            responseItem.name,
            responseItem.description,
            responseItem.isActive,
            responseItem.createdAt,
            responseItem.id
          )
      ),
    };
  }

  async create(body: BodyCreate): Promise<Category> {
    return this.httpClient.post("/categories", body);
  }

  async find(id: string): Promise<Category> {
    const response = await this.httpClient.get(`/categories/${id}`);

    return new Category(
      response.name,
      response.description,
      response.isActive,
      response.createdAt,
      response.id
    );
  }

  async update(id: string, body: BodyUpdate): Promise<Category> {
    const response = await this.httpClient.patch(`/categories/${id}`, body);

    return new Category(
      response.name,
      response.description,
      response.isActive,
      response.createdAt,
      response.id
    );
  }

  async destroy(id: string): Promise<void> {
    await this.httpClient.delete(`/categories/${id}`);

    return;
  }
}
