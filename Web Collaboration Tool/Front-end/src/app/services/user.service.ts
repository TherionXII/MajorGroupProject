import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  public create(user: any): Observable<any> {
    return this.httpClient.post('http://localhost:8080/createUser', user, { responseType: 'text' });
  }
}