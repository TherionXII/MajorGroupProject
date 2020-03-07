import {IMessage} from './IMessage';

export interface IThread {
  id: number;

  messages?: Array<IMessage>;

  lastMessage?: IMessage;
}
