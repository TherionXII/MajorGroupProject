import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IQuery} from '../Interfaces/IQuery';
import {IParentQueryData} from '../Interfaces/IParentQueryData';
import {IQueryData} from '../Interfaces/IQueryData';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  constructor(private httpClient: HttpClient) { }

  public getRecentQueries(): Observable<IQuery[]> {
    return this.httpClient.get<IQuery[]>('http://localhost:8080/getRecentQueries');
  }

  public createParentQuery(queryData: IQueryData, username: string): Observable<number> {
    return this.httpClient.post<number>('http://localhost:8080/' + username + '/createParentQuery', queryData);
  }

  public createParentQueryData(parentQueryData: IParentQueryData, id: number): Observable<string> {
    return this.httpClient.post<string>('http://localhost:8080/' + id + '/createParentQueryData', parentQueryData);
  }

  public getLastQueryForUser(username: string): Observable<IQuery> {
    return this.httpClient.get<IQuery>('http://localhost:8080/' + username + '/getLastQuery');
  }

  getQueryById(id: number): Observable<IQuery> {
    return this.httpClient.get<IQuery>('http://localhost:8080/getQuery/' + id);
  }
}
