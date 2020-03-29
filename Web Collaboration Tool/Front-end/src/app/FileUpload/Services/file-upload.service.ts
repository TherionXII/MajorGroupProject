import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

    constructor(private http: HttpClient) { }

    public uploadFile(file: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', file);

        return this.http.post('http://localhost:8080/pdf/fileUpload', formData, {
            reportProgress: true,
            observe: 'events'
        });
    }

    public uploadFileAndArea(file: File, pageNumber: any, cropPosition: any): any {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('pageNumber', pageNumber);
        formData.append('position', JSON.stringify(cropPosition));
        console.log(JSON.stringify(cropPosition));

        return this.http.post('http://localhost:8080/pdf/textExtraction', formData, {
            reportProgress: true,
            observe: 'events'
        });
    }
}
