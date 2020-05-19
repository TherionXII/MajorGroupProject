import {IThread} from '../../Utility/Interfaces/IThread';

export interface IPrivateCollaboration {
  firstCollaborator: string;
  secondCollaborator: string;

  thread?: IThread;
}
