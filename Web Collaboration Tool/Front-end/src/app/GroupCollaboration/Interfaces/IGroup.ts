import {IGroupMember} from './IGroupMember';
import {IThread} from '../../Utility/Interfaces/IThread';

export interface IGroup {
  id?: number;

  description: string;
  title: string;

  groupMembers: Array<IGroupMember>;

  thread: IThread;
}
