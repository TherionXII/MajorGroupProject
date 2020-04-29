export interface IPrivateCollaborationRequest {
  sender: string;
  recipient: string;

  isAccepted?: boolean;
}
