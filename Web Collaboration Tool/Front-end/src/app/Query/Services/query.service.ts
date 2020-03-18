import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IQuery } from '../Interfaces/IQuery';
import {IQueryVote} from '../Interfaces/IQueryVote';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  constructor(private httpClient: HttpClient) { }

  public getRecentQueries(): Observable<IQuery[]> {
    return this.httpClient.get<IQuery[]>(`http://localhost:8080/getRecentQueries`);
  }

  public getRecentQueriesForUser(username: string): Observable<IQuery[]> {
    return this.httpClient.get<IQuery[]>(`http://localhost:8080/${username}/getRecentQueries`);
  }

  public getRecentResponsesForUser(username: string): Observable<IQuery[]> {
    return this.httpClient.get<IQuery[]>(`http://localhost:8080/${username}/getRecentResponses`);
  }

  public getQueryById(id: number): Observable<IQuery> {
    return this.httpClient.get<IQuery>(`http://localhost:8080/getQuery/${id}`);
  }

  public createQuery(query: IQuery, username: string): Observable<IQuery> {
    return this.httpClient.post<IQuery>(`http://localhost:8080/${username}/createQuery`, query);
  }

  public createResponse(response: IQuery, username: string, id: number): Observable<IQuery> {
    return this.httpClient.post<IQuery>(`http://localhost:8080/${username}/${id}/createResponse`, response);
  }

  public submitVote(vote: IQueryVote): Observable<IQuery> {
    return this.httpClient.post<IQuery>(`http://localhost:8080/vote`, vote);
  }
}
