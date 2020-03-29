export interface IQuery {
  id?: number;

  title?: string;
  subtitle?: string;

  contents: string;
  rating: number;

  username: string;
  parent?: IQuery;
  children?: Array<IQuery>;

  createdAt?: any;
}
