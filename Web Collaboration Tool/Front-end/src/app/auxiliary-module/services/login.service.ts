import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUser } from '../../user-feature/Interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpClient: HttpClient) { }

  public login(user: IUser): Observable<string> {
    return this.httpClient.post('http://localhost:8080/login', user, { responseType: 'text' });
  }
}
