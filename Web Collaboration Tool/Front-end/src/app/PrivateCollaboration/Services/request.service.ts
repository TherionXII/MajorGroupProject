import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IPrivateCollaborationRequest} from '../../Utility/Interfaces/IPrivateCollaborationRequest';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private httpClient: HttpClient) {}

  public getPrivateCollaborationRequestsForUser(username: string): Observable<Array<IPrivateCollaborationRequest>> {
    return this.httpClient.get<Array<IPrivateCollaborationRequest>>(`http://localhost:8080/getPrivateCollaborationRequests/${username}`);
  }
}
