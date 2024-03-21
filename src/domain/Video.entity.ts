import CastMember from "./CastMember.entity";
import Category from "./Category.entity";
import Genre from "./Genre.entity";

export default class Video {
  id: string | null;
  title: string;
  description: string;
  yearLaunched?: number;
  rating: string;
  duration: number | null;
  isOpened: boolean;
  isPublished?: boolean;
  banner?: string | null;
  thumbnail?: string | null;
  thumbnailHalf?: string | null;
  createdAt?: Date;
  genres?: Array<Genre>;
  genresId?: Array<string>;
  categories?: Array<Category>;
  categoriesId?: Array<string>;
  castMembers?: Array<CastMember>;
  castMembersId?: Array<string>;

  constructor(readonly props: VideoProps) {
    (this.id = props.id || null), (this.title = props.title || "");
    this.description = props.description || "";
    this.yearLaunched = props.yearLaunched;
    this.rating = props.rating || "";
    this.banner = props.banner || null;
    this.thumbnail = props.thumbnail || null;
    this.thumbnailHalf = props.thumbnail || null;
    this.duration = props.duration || null;
    this.isOpened = props.isOpened || false;
    this.isPublished = props?.isPublished;
    this.createdAt = props.createdAt;
    this.genresId = props.genresId || [];
    this.categoriesId = props.categoriesId || [];
    this.castMembersId = props.castMembersId || [];
    this.genres = props.genres
    this.categories = props.categories;
    this.castMembers = props.castMembers;
  }
}

type VideoProps = {
  title?: string;
  description?: string;
  yearLaunched?: number;
  rating?: string;
  duration?: number;
  isOpened?: boolean;
  isPublished?: boolean;
  createdAt?: Date;
  id?: string;
  banner: string | null;
  thumbnail: string | null;
  thumbnailHalf: string | null;
  genres?: Array<Genre>;
  genresId?: Array<string>;
  categories?: Array<Category>;
  categoriesId?: Array<string>;
  castMembers?: Array<CastMember>;
  castMembersId?: Array<string>;
};
