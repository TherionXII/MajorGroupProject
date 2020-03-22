import {IGroupMember} from './IGroupMember';

export interface IGroup {
  id?: number;

  description: string;
  title: string;

  groupMembers: Array<IGroupMember>;
}
