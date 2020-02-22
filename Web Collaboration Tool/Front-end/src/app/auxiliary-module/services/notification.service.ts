import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private httpClient: HttpClient) {}

  public hasSentCollaborationRequest(sender: string, recipient: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`http://localhost:8080/hasSentRequest/${sender}/${recipient}`);
  }

  public hasReceivedCollaborationRequest(recipient: string, sender: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`http://localhost:8080/hasReceivedRequest/${recipient}/${sender}`);
  }
}
