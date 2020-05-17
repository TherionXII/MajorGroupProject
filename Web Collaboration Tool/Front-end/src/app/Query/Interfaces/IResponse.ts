import {IQuery} from './IQuery';

export interface IResponse {
  id: number;

  response: string;
  username: string;
  rating: number;

  parent: IQuery;
}
