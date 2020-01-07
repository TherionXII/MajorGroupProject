import { Injectable } from '@angular/core';
import {IUser} from '../../user-feature/Interfaces/IUser';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpClient: HttpClient) { }

  public login(user: IUser): Observable<string> {
    return this.httpClient.post('http://localhost:8080/login', user, { responseType: 'text' });
  }
}
