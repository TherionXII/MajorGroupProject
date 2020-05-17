import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IQuery } from '../Interfaces/IQuery';
import {IResponseVote} from '../Interfaces/IResponseVote';
import {IResponse} from '../Interfaces/IResponse';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  constructor(private httpClient: HttpClient) { }

  public getRecentPublicQueries(): Observable<Array<IQuery>> {
    return this.httpClient.get<Array<IQuery>>(`http://localhost:8080/api/queries/publicQueries/getRecentQueries`);
  }

  public getRecentGroupQueries(groupId: string): Observable<Array<IQuery>> {
    return this.httpClient.get<Array<IQuery>>(`http://localhost:8080/api/queries/groupQueries/${groupId}/getRecentQueries`);
  }

  public getRecentQueriesForUser(username: string): Observable<Array<IQuery>> {
    return this.httpClient.get<Array<IQuery>>(`http://localhost:8080/api/queries/publicQueries/${username}/getRecentQueries`);
  }

  public getRecentResponsesForUser(username: string): Observable<Array<IResponse>> {
    return this.httpClient.get<Array<IResponse>>(`http://localhost:8080/api/queries/publicQueries/${username}/getRecentResponses`);
  }

  public getQueryById(queryId: string): Observable<IQuery> {
    return this.httpClient.get<IQuery>(`http://localhost:8080/api/queries/${queryId}/getQuery`);
  }

  public createQuery(groupId: string, query: IQuery, isPublic: boolean): Observable<IQuery> {
    if(isPublic)
      return this.httpClient.post<IQuery>(`http://localhost:8080/api/queries/publicQueries/${query.username}/createQuery`, query);
    else
      return this.httpClient.post<IQuery>(`http://localhost:8080/api/queries/groupQueries/${query.username}/${groupId}/createQuery`, query);
  }

  public createResponse(responseId: number, username: string, response: IResponse): Observable<IQuery> {
    return this.httpClient.post<IQuery>(`http://localhost:8080/api/queries/${username}/${responseId}/createResponse`, response);
  }

  public submitVote(vote: IResponseVote): Observable<IResponse> {
    return this.httpClient.post<IResponse>(`http://localhost:8080/${vote.queryId}/vote`, vote);
  }
}
