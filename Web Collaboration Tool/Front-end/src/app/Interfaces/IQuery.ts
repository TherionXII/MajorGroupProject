import {IUser} from './IUser';
import {IParentQueryData} from './IParentQueryData';
import {IQueryData} from './IQueryData';

export interface IQuery {
  id: number;

  parentQueryData?: IParentQueryData;
  queryData: IQueryData;

  user?: IUser;
  parent?: IQuery;
  children?: Array<IQuery>;

  createdAt?: any;
}
