import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {INotification} from '../Interfaces/INotification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private httpClient: HttpClient) {}

  public hasSentCollaborationRequest(sender: string, recipient: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`http://localhost:8080/api/privateRequests/${sender}/${recipient}/hasSentRequest`);
  }

  public hasReceivedCollaborationRequest(sender: string, recipient: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`http://localhost:8080/api/privateRequests/${recipient}/${sender}/hasReceivedRequest`);
  }

  public getAllNotificationsForUser(username: string): Observable<Array<INotification>> {
    return this.httpClient.get<Array<INotification>>(`http://localhost:8080/api/notification/${username}/getNotifications`);
  }
}
