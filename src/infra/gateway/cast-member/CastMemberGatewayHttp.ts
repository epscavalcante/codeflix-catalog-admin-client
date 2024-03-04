import HttpClient from "../../http/HttpClient";
import CastMemberGateway from "./CastMemberGateway";
import CategoryGateway, {
  BodyCreate,
  BodyUpdate,
  CollectionResponse,
  ItemResponse,
} from "./CastMemberGateway";

export default class CastMemberGatewayHttp implements CastMemberGateway {
  constructor(readonly httpClient: HttpClient) {}

  async list(): Promise<CollectionResponse> {
    const response = await this.httpClient.get("/cast-members");

    return response.data;
  }

  async create(body: BodyCreate): Promise<ItemResponse> {
    return this.httpClient.post("/cast-members", body);
  }

  async find(id: string): Promise<ItemResponse> {
    const response = await this.httpClient.get(`/cast-members/${id}`);

    return response.data;
  }

  async update(id: string, body: BodyUpdate): Promise<ItemResponse> {
    const response = await this.httpClient.patch(`/cast-members/${id}`, body);

    return response.data;
  }

  async destroy(id: string): Promise<void> {
    return await this.httpClient.delete(`/cast-members/${id}`);
  }
}
