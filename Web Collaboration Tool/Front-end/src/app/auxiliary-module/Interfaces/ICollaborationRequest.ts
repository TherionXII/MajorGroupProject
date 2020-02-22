export interface ICollaborationRequest {
  sender: string;
  recipient: string;

  responded: boolean;

  accepted?: boolean;
}
