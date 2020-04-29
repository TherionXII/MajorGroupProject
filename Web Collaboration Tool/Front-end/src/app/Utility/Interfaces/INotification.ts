export interface INotification {
  content?: string;
  title?: string;

  sender?: string;
  recipient?: string;

  hasResponded?: boolean;

  isAccepted?: boolean;
}
