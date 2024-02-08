export default class Category {
  constructor(
    readonly name:string,
    readonly description: string | null,
    readonly isActive: boolean,
    readonly createdAt: Date,
    readonly id?: string,
  ) {}
}
