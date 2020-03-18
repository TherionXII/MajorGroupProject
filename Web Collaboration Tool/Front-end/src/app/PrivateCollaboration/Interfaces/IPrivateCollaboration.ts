import {IThread} from '../../Utility/Interfaces/IThread';

export interface IPrivateCollaboration {
  collaboratorOneUsername: string;
  collaboratorTwoUsername: string;

  thread?: IThread;
}
