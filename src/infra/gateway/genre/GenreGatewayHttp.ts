import Genre from "../../../domain/Genre.entity";
import HttpClient from "../../http/HttpClient";
import { Pagination } from "../../http/Response";
import GenreGateway, {
  BodyCreate,
  BodyUpdate,
  CollectionResponse,
  ItemResponse,
} from "./GenreGateway";

export default class GenreGatewayHttp implements GenreGateway {
  constructor(readonly httpClient: HttpClient) {}

  async list(): Promise<Pagination<Genre>> {
    const response = await this.httpClient.get("/genres");

    return {
      meta: response.meta,
      data: response.data.map(
        (responseItem: any) =>
          new Genre(
            responseItem.name,
            responseItem.categoriesId,
            responseItem.categories,
            responseItem.createdAt,
            responseItem.id
          )
      ),
    };
  }

  async create(body: BodyCreate): Promise<Genre> {
    const response = await this.httpClient.post("/genres", body);

    return new Genre(
      response.name,
      response.categoriesId,
      response.categories,
      response.createdAt,
      response.id
    );
  }

  async find(id: string): Promise<Genre> {
    const response = await this.httpClient.get(`/genres/${id}`);

    return new Genre(
      response.name,
      response.categoriesId,
      response.categories,
      response.createdAt,
      response.id
    );
  }

  async update(id: string, body: BodyUpdate): Promise<Genre> {
    const response = await this.httpClient.patch(`/genres/${id}`, body);

    return new Genre(
      response.name,
      response.categoriesId,
      response.categories,
      response.createdAt,
      response.id
    );
  }

  async destroy(id: string): Promise<void> {
    await this.httpClient.delete(`/genres/${id}`);

    return;
  }
}
