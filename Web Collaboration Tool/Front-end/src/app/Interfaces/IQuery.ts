import {IUser} from './IUser';

export interface IQuery {
  id: number;

  title: string;
  subtitle: string;
  contents: string;

  user?: IUser;
  parent?: IQuery;
  children?: Array<IQuery>;
}
