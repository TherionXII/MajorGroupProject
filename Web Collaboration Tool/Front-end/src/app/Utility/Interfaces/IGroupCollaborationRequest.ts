import {IGroup} from '../../GroupCollaboration/Interfaces/IGroup';

export interface IGroupCollaborationRequest {
  id?: number;

  groupId: number;
  recipient: string;
  isAccepted: boolean;

  group?: IGroup;
}
