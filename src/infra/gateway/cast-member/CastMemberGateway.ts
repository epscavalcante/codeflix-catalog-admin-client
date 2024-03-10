import CastMember from "../../../domain/CastMember.entity";

export type ItemResponse = CastMember;
export type CollectionResponse = {
  data: Array<ItemResponse>;
  meta: {
    currentPage: number;
    lasPage: number;
    perPage: number;
    total: number;
  };
};

export default interface CastMemberGateway {
  list(): Promise<CollectionResponse>;
  create(body: BodyCreate): Promise<ItemResponse>;
  find(id: string): Promise<ItemResponse>;
  update(id: string, body: BodyUpdate): Promise<ItemResponse>;
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
