export enum CastMemberType {
  ACTOR = 1,
  DIRECTOR = 2,
}

export default class CastMember {
  constructor(
    readonly name: string,
    readonly type: CastMemberType,
    readonly createdAt: Date,
    readonly id?: string
  ) {}
}
