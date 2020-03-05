import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IPrivateCollaboration} from '../Interfaces/IPrivateCollaboration';

@Injectable({
  providedIn: 'root'
})
export class PrivateCollaborationService {
  constructor(private httpClient: HttpClient) {}

  public isCollaborating(firstUsername: string, secondUsername: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`http://localhost:8080/isCollaborating/${firstUsername}/${secondUsername}`);
  }

  public getAllPrivateCollaborationsForUser(username: string): Observable<Array<IPrivateCollaboration>> {
    return this.httpClient.get<Array<IPrivateCollaboration>>(`http://localhost:8080/privateCollaborations/${username}`);
  }
}
