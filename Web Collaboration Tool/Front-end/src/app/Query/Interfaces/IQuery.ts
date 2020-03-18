import { IUser } from '../../User/Interfaces/IUser';

export interface IQuery {
  id?: number;

  title?: string;
  subtitle?: string;

  contents: string;
  rating: number;

  user?: IUser;
  parent?: IQuery;
  children?: Array<IQuery>;

  createdAt?: any;
}
