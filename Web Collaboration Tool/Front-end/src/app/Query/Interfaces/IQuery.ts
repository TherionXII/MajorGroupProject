import {IResponse} from './IResponse';

export interface IQuery {
  id: number;

  title: string;
  subtitle: string;

  contents: string;

  username: string;
  responses?: Array<IResponse>;
}
