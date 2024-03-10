type GenreCategory = {
  id: string;
  name: string;
  isActive: boolean;
};

export default class Genre {
  constructor(
    readonly name:string,
    readonly categoriesId: Array<string>,
    readonly categories: GenreCategory[],
    readonly createdAt: Date,
    readonly id?: string,
  ) {}
}
