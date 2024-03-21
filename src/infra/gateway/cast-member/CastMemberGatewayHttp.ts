import CastMember from "../../../domain/CastMember.entity";
import HttpClient from "../../http/HttpClient";
import { Pagination } from "../../http/Response";
import CastMemberGateway from "./CastMemberGateway";
import CategoryGateway, { BodyCreate, BodyUpdate } from "./CastMemberGateway";

export default class CastMemberGatewayHttp implements CastMemberGateway {
  constructor(readonly httpClient: HttpClient) {}

  async list(): Promise<Pagination<CastMember>> {
    const response = await this.httpClient.get("/cast-members");

    return {
      meta: response.meta,
      data: response.data.map(
        (responseItem: any) =>
          new CastMember(
            responseItem.name,
            responseItem.type,
            responseItem.createdAt,
            responseItem.id
          )
      ),
    };
  }

  async create(body: BodyCreate): Promise<CastMember> {
    const response = await this.httpClient.post("/cast-members", body);

    return new CastMember(
      response.name,
      response.type,
      response.createdAt,
      response.id
    );
  }

  async find(id: string): Promise<CastMember> {
    const response = await this.httpClient.get(`/cast-members/${id}`);

    return new CastMember(
      response.name,
      response.type,
      response.createdAt,
      response.id
    );
  }

  async update(id: string, body: BodyUpdate): Promise<CastMember> {
    const response = await this.httpClient.patch(`/cast-members/${id}`, body);

    return new CastMember(
      response.name,
      response.type,
      response.createdAt,
      response.id
    );
  }

  async destroy(id: string): Promise<void> {
    await this.httpClient.delete(`/cast-members/${id}`);

    return;
  }
}
