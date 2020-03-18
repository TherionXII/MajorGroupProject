import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IRequest} from '../../auxiliary-module/IRequest';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private httpClient: HttpClient) {}

  public getPrivateCollaborationRequestsForUser(username: string): Observable<Array<IRequest>> {
    return this.httpClient.get<Array<IRequest>>(`http://localhost:8080/getPrivateCollaborationRequests/${username}`);
  }
}
