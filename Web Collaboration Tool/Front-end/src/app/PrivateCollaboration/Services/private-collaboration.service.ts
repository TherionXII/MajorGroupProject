import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IPrivateCollaboration} from '../Interfaces/IPrivateCollaboration';
import {IPrivateCollaborationRequest} from '../../Utility/Interfaces/IPrivateCollaborationRequest';

@Injectable({
  providedIn: 'root'
})
export class PrivateCollaborationService {
  constructor(private httpClient: HttpClient) {}

  public isCollaborating(firstUsername: string, secondUsername: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`http://localhost:8080/api/privateCollaboration/${firstUsername}/${secondUsername}/isCollaborating`);
  }

  public getPrivateCollaborationsForUser(username: string): Observable<Array<IPrivateCollaboration>> {
    return this.httpClient.get<Array<IPrivateCollaboration>>(`http://localhost:8080/api/privateCollaboration/${username}/privateCollaborations`);
  }

  public getPrivateCollaborationRequestsForUser(username: string): Observable<Array<IPrivateCollaborationRequest>> {
    return this.httpClient.get<Array<IPrivateCollaborationRequest>>(`http://localhost:8080/api/privateRequests/${username}/getPrivateCollaborationRequests`);
  }
}
