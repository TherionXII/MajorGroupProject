import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IPaperQuestion} from '../Interfaces/IPaperQuestion';
import {IPaper} from '../Interfaces/IPaper';
import {IPage} from '../Interfaces/IPage';

@Injectable({
  providedIn: 'root'
})
export class PaperService {
  constructor(private http: HttpClient) { }

  public createPaper(groupId: string, paper: IPaper): Observable<IPaper | string> {
    return this.http.post<IPaper | string>(`http://localhost:8080/api/papers/${groupId}/createPaper`, paper);
  }

  public uploadFile(file: File, paperId: number): Observable<Array<IPage>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<Array<IPage>>(`http://localhost:8080/api/papers/${paperId}/uploadPaper`, formData);
  }

  public processQuestion(extractedQuestion: IPaperQuestion, paperId: number): Observable<IPaperQuestion> {
    return this.http.post<IPaperQuestion>(`http://localhost:8080/api/papers/${paperId}/${extractedQuestion.pageNumber}/extractText`, extractedQuestion);
  }

  public getPapersForGroup(groupId: string): Observable<Array<IPaper>> {
    return this.http.get<Array<IPaper>>(`http://localhost:8080/api/papers/${groupId}/getPapers`);
  }

  public getPaper(paperId: string): Observable<IPaper> {
    return this.http.get<IPaper>(`http://localhost:8080/api/papers/${paperId}/getPaper`);
  }
}
