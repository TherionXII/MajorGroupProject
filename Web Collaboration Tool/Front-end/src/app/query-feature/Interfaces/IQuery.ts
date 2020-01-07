import {IUser} from '../../user-feature/Interfaces/IUser';
import {IParentQueryData} from './IParentQueryData';
import {IQueryData} from '../query/IQueryData';

export interface IQuery {
  id: number;

  parentQueryData?: IParentQueryData;
  queryData: IQueryData;

  user?: IUser;
  parent?: IQuery;
  children?: Array<IQuery>;

  createdAt?: any;
}
