import {IQuery} from './IQuery';

export interface IQueryVote {
  username: string;

  query: IQuery;
  queryId: number;

  vote: boolean;
}
