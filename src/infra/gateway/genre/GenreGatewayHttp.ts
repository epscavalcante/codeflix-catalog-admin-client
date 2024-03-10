import HttpClient from "../../http/HttpClient";
import GenreGateway, {
  BodyCreate,
  BodyUpdate,
  CollectionResponse,
  ItemResponse,
} from "./GenreGateway";

export default class GenreGatewayHttp implements GenreGateway {
  constructor(readonly httpClient: HttpClient) {}

  async list(): Promise<CollectionResponse> {
    const response = await this.httpClient.get("/genres");

    return response.data;
  }

  async create(body: BodyCreate): Promise<ItemResponse> {
    return this.httpClient.post("/genres", body);
  }

  async find(id: string): Promise<ItemResponse> {
    const response = await this.httpClient.get(`/genres/${id}`);

    return response.data;
  }

  async update(id: string, body: BodyUpdate): Promise<ItemResponse> {
    const response = await this.httpClient.patch(`/genres/${id}`, body);

    return response.data;
  }

  async destroy(id: string): Promise<void> {
    return await this.httpClient.delete(`/genres/${id}`);
  }
}
