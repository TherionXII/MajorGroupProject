import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUser } from '../../user-feature/Interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  constructor(private httpClient: HttpClient) { }

  public createUser(user: IUser): Observable<string> {
    return this.httpClient.post('http://localhost:8080/createUser', user, { responseType: 'text' });
  }
}
