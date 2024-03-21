import Category from "../../../domain/Category.entity";
import { Pagination } from "../../http/Response";

export default interface CategoryGateway {
  list(): Promise<Pagination<Category>>;
  create(body: BodyCreate): Promise<Category>;
  find(id: string): Promise<Category>;
  update(id: string, body: BodyUpdate): Promise<Category>;
  destroy(id: string): Promise<void>;
}

export type BodyCreate = {
  name: string;
  description: string | null;
  isActive: boolean;
};

export type BodyUpdate = {
  name: string;
  description: string | null;
  isActive: boolean;
};
