import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrivateCollaborationService {
  constructor(private httpClient: HttpClient) {}

  public isCollaborating(firstUsername: string, secondUsername: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`http://localhost:8080/isCollaborating/${firstUsername}/${secondUsername}`);
  }
}
