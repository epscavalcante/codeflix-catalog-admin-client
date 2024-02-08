import Category from "../../domain/Category.entity";
import HttpClient from "../http/HttpClient";
import CategoryGateway, {
  CollectionResponse,
  ItemResponse,
} from "./CategoryGateway";

export default class CategoryGatewayHttp implements CategoryGateway {
  constructor(readonly httpClient: HttpClient) {}

  async list(): Promise<CollectionResponse> {
    return this.httpClient.get("/categories");
  }

  async create(params: {
    name: string;
    description: string | null;
    isActive: boolean;
  }): Promise<ItemResponse> {
    return this.httpClient.post("/categories", params);
  }
}
