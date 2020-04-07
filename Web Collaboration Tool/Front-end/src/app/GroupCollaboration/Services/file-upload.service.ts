import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ExtractedPaperQuestion, ProcessedPaperQuestion} from '../Interfaces/PaperQuestion';
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

    public uploadFileAndArea(extractedQuestion: ExtractedPaperQuestion, paperId: number): Observable<string> {
        const formData = new FormData();
        formData.append('position', JSON.stringify(extractedQuestion.questionPosition));

        return this.http.post<string>(`http://localhost:8080/pdf/textExtraction/${paperId}/${extractedQuestion.pageNumber}`, formData);
    }
}
