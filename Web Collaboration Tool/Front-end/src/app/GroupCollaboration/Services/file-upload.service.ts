import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {PaperQuestion} from '../Interfaces/PaperQuestion';
import {IPaper} from '../Interfaces/IPaper';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

    constructor(private http: HttpClient) { }

    public uploadFile(file: File, groupId: number): Observable<IPaper> {
        const formData = new FormData();
        formData.append('file', file);

        return this.http.post<IPaper>(`http://localhost:8080/pdf/fileUpload/${groupId}`, formData);
    }

    public processQuestion(extractedQuestion: PaperQuestion, paperId: number): Observable<PaperQuestion> {
        return this.http.post<PaperQuestion>(`http://localhost:8080/pdf/textExtraction/${paperId}/${extractedQuestion.pageNumber}`, extractedQuestion);
    }
}
