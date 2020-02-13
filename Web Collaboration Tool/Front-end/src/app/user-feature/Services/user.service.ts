import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUserProfile} from '../Interfaces/IUserProfile';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  public getUserProfile(username: string): Observable<IUserProfile> {
    return this.httpClient.get<IUserProfile>('http://localhost:8080/' + username + '/getUserProfile');
  }

  public updateUserPassword(username: string, password: string): Observable<any> {
    return this.httpClient.post<string>('http://localhost:8080/' + username + '/updatePassword', password);
  }

  public updateUserEmail(username: string, email: string): Observable<string> {
    return this.httpClient.post<string>('http://localhost:8080/' + username + '/updateEmail', email);
  }

  public updateUserProfile(username: string, profile: IUserProfile): Observable<string> {
    return this.httpClient.post<string>('http://localhost:8080/' + username + '/updateProfile', profile);
  }
}
