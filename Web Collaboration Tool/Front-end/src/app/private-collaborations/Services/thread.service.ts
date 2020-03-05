import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  constructor(private httpClient: HttpClient) { }


  public createNewThread(collaboratorOne: string, collaboratorTwo: string): Observable<number> {
    return this.httpClient.get<number>(`http://localhost:8080/createPrivateThread/${collaboratorOne}/${collaboratorTwo}`);
  }
}
