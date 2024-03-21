import CastMember from "../../../domain/CastMember.entity";
import { Pagination } from "../../http/Response";

export default interface CastMemberGateway {
  list(): Promise<Pagination<CastMember>>;
  create(body: BodyCreate): Promise<CastMember>;
  find(id: string): Promise<CastMember>;
  update(id: string, body: BodyUpdate): Promise<CastMember>;
  destroy(id: string): Promise<void>;
}

export type BodyCreate = {
  name: string;
  type: number;
};

export type BodyUpdate = {
  name: string;
  type: number;
};
