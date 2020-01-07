import { Injectable } from '@angular/core';
import {IUser} from '../../user-feature/Interfaces/IUser';
import {Observable} from 'rxjs';
import {IUserProfile} from '../../user-feature/Interfaces/IUserProfile';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  constructor(private httpClient: HttpClient) { }

  public createUser(user: IUser): Observable<string> {
    return this.httpClient.post('http://localhost:8080/createUser', user, { responseType: 'text' });
  }

  public createUserProfile(username: string, userInformation: IUserProfile): Observable<string> {
    return this.httpClient.post<string>('http://localhost:8080/' + username + '/createUserProfile', userInformation);
  }
}
