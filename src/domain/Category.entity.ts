export type CategoryProps = {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
};

export default class Category {
  constructor(readonly props: CategoryProps) {}

  toJSON() {
    return {
      id: this.props.id,
      name: this.props.name,
      isActive: this.props.isActive,
      createdAt: this.props.createdAt,
    };
  }
}
