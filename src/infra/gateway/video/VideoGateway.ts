import Video from "../../../domain/Video.entity";
import { Pagination } from "../../http/Response";

export default interface VideoGateway {
  list(): Promise<Pagination<Video>>;
  create(body: BodyCreate): Promise<Video>;
  find(id: string): Promise<Video>;
  update(id: string, body: BodyUpdate): Promise<Video>;
  destroy(id: string): Promise<void>;
}

export type BodyCreate = {
  title: string;
  description: string;
  yearLaunched: number;
  duration: number;
  rating: string;
  isOpened: boolean;
  genresId: Array<string>;
  categoriesId: Array<string>;
  castMembersId: Array<string>;
};

export type BodyUpdate = {
  title?: string;
  description?: string;
  yearLaunched?: number;
  duration?: number;
  rating?: string;
  isOpened?: boolean;
  isPublished?: boolean;
  genresId?: Array<string>;
  categoriesId?: Array<string>;
  castMembersId?: Array<string>;
};
