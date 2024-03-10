import HttpClient from "../../http/HttpClient";
import CategoryGateway, {
  BodyCreate,
  BodyUpdate,
  CollectionResponse,
  ItemResponse,
} from "./CategoryGateway";

export default class CategoryGatewayHttp implements CategoryGateway {
  constructor(readonly httpClient: HttpClient) {}

  async list(): Promise<CollectionResponse> {
    const response = await this.httpClient.get("/categories");

    return response.data;
  }

  async create(body: BodyCreate): Promise<ItemResponse> {
    return this.httpClient.post("/categories", body);
  }

  async find(id: string): Promise<ItemResponse> {
    const response = await this.httpClient.get(`/categories/${id}`);

    return response.data;
  }

  async update(id: string, body: BodyUpdate): Promise<ItemResponse> {
    const response = await this.httpClient.patch(`/categories/${id}`, body);

    return response.data;
  }

  async destroy(id: string): Promise<void> {
    return await this.httpClient.delete(`/categories/${id}`);
  }
}
