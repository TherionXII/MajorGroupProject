import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {IMessage} from '../Interfaces/IMessage';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  constructor(private httpClient: HttpClient) { }

  public createNewThread(collaboratorOne: string, collaboratorTwo: string): Observable<number> {
    return this.httpClient.get<number>(`http://localhost:8080/api/chatThreads/${collaboratorOne}/${collaboratorTwo}/createPrivateThread`);
  }

  public getMessagesForThread(id: string): Observable<Array<IMessage>> {
    return this.httpClient.get<Array<IMessage>>(`http://localhost:8080/api/chatThreads/${id}/getMessagesForThread`);
  }
}
