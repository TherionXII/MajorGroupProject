import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PaperService} from '../../Services/paper.service';
import {IPage} from '../../Interfaces/IPage';

@Component({
  selector: 'app-upload-paper',
  templateUrl: './paper-upload.component.html',
  styleUrls: ['./paper-upload.component.css']
})
export class PaperUploadComponent implements OnInit {
  @Input()
  public paperId: number;

  @Output()
  public paperUploadedEvent: EventEmitter<Array<IPage>>;

  public fileData: File;
  public uploading: boolean;

  public constructor(private paperService: PaperService) {
    this.uploading = false;
    this.paperUploadedEvent = new EventEmitter<Array<IPage>>();
  }

  public ngOnInit(): void {
  }

  public onFileChange(fileInput: any): void {
    this.fileData = fileInput.target.files[0] as File;
  }

  public onUpload(): void {
    this.uploading = true;
    this.paperService.uploadFile(this.fileData, this.paperId)
      .subscribe(pages => this.paperUploadedEvent.emit(pages), error => console.log(error));
  }
}
