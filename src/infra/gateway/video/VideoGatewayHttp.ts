import Video from "../../../domain/Video.entity";
import HttpClient from "../../http/HttpClient";
import { Pagination } from "../../http/Response";
import VideoGateway, { BodyCreate, BodyUpdate } from "./VideoGateway";

export default class VideoGatewayHttp implements VideoGateway {
  constructor(readonly httpClient: HttpClient) {}

  async list(options?: any): Promise<Pagination<Video>> {
    const response = await this.httpClient.get("/videos", options);

    return {
      meta: response.meta,
      data: response.data.map(
        (responseItem: any) =>
          new Video({
            title: responseItem.title,
            description: responseItem.description,
            yearLaunched: responseItem.yearLaunched,
            rating: responseItem.rating,
            duration: responseItem.duration,
            isOpened: responseItem.isOpened,
            isPublished: responseItem.isPublished,
            createdAt: responseItem.createdAt,
            banner: responseItem.banner,
            thumbnail: responseItem.thumbnail,
            thumbnailHalf: responseItem.thumbnailHalf,
            id: responseItem.id,
            genresId: responseItem.genresId,
            genres: responseItem.genres,
            categories: responseItem.categories,
            categoriesId: responseItem.categoriesId,
            castMembersId: responseItem.castMembersId,
            castMembers: responseItem.castMembers,
          })
      ),
    };
  }

  async create(body: BodyCreate): Promise<Video> {
    return this.httpClient.post("/videos", body);
  }

  async find(id: string): Promise<Video> {
    const response = await this.httpClient.get(`/videos/${id}`);

    return new Video({
      title: response.title,
      description: response.description,
      yearLaunched: response.yearLaunched,
      rating: response.rating,
      duration: response.duration,
      isOpened: response.isOpened,
      isPublished: response.isPublished,
      createdAt: response.createdAt,
      id: response.id,
      banner: response.banner,
      thumbnail: response.thumbnail,
      thumbnailHalf: response.thumbnailHalf,
      genresId: response.genresId,
      genres: response.genres,
      categories: response.categories,
      categoriesId: response.categoriesId,
      castMembersId: response.castMembersId,
      castMembers: response.castMembers,
    });
  }

  async update(id: string, body: BodyUpdate): Promise<Video> {
    const response = await this.httpClient.patch(`/videos/${id}`, body);

    return response.data;
  }

  async destroy(id: string): Promise<void> {
    return await this.httpClient.delete(`/videos/${id}`);
  }

  async upload(id: string, file: FormData): Promise<void> {
    const response = await this.httpClient.post(
      `/videos/${id}/uploads`, 
      file, 
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    console.log(response);

    // return new Video({
    //   title: response.title,
    //   description: response.description,
    //   yearLaunched: response.yearLaunched,
    //   rating: response.rating,
    //   duration: response.duration,
    //   isOpened: response.isOpened,
    //   isPublished: response.isPublished,
    //   createdAt: response.createdAt,
    //   id: response.id,
    //   banner: response.banner,
    //   thumbnail: response.thumbnail,
    //   genresId: response.genresId,
    //   genres: response.genres,
    //   categories: response.categories,
    //   categoriesId: response.categoriesId,
    //   castMembersId: response.castMembersId,
    //   castMembers: response.castMembers,
    // });
  }
}
