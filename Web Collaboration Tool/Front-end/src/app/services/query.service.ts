import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IQuery} from '../Interfaces/IQuery';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  constructor(private httpClient: HttpClient) { }

  public getRecentQueries(): Observable<IQuery[]> {
    return this.httpClient.get<IQuery[]>('http://localhost:8080/getRecentQueries');
  }

  public createQuery(query: IQuery, username: string): Observable<string> {
    return this.httpClient.post<string>('http://localhost:8080/' + username + '/createQuery', query);
  }

  public getLastQueryForUser(username: string): Observable<IQuery> {
    return this.httpClient.get<IQuery>('http://localhost:8080/' + username + '/getLastQuery');
  }

  getQueryById(id: number): Observable<IQuery> {
    return this.httpClient.get<IQuery>('http://localhost:8080/getQuery/' + id);
  }
}
