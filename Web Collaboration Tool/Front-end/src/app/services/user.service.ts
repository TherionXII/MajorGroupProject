import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUserInformation} from '../Interfaces/IUserInformation';
import {IUser} from '../Interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  public login(user: IUser): Observable<string> {
    return this.httpClient.post('http://localhost:8080/login', user, { responseType: 'text' });
  }

  public createUser(user: IUser): Observable<string> {
    return this.httpClient.post('http://localhost:8080/createUser', user, { responseType: 'text' });
  }

  public createUserInformation(username: string, userInformation: any): Observable<any> {
    return this.httpClient.post('http://localhost:8080/' + username + '/createUserInformation', userInformation);
  }

  public getUserInformation(username: string): Observable<IUserInformation> {
    return this.httpClient.get<IUserInformation>('http://localhost:8080/getUserInformation/' + username);
  }
}
