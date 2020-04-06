import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ExtractedPaperQuestion, ProcessedPaperQuestion} from '../Interfaces/PaperQuestion';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

    constructor(private http: HttpClient) { }

    public uploadFile(file: File): Observable<Array<string>> {
        const formData = new FormData();
        formData.append('file', file);

        return this.http.post<Array<string>>('http://localhost:8080/pdf/fileUpload', formData);
    }

    public uploadFileAndArea(file: File, extractedQuestion: ExtractedPaperQuestion): Observable<ProcessedPaperQuestion> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('pageNumber', extractedQuestion.pageNumber.toString());
        formData.append('position', JSON.stringify(extractedQuestion.questionPosition));
        console.log(JSON.stringify(extractedQuestion.questionPosition));

        return this.http.post<ProcessedPaperQuestion>('http://localhost:8080/pdf/textExtraction', formData);
    }
}
