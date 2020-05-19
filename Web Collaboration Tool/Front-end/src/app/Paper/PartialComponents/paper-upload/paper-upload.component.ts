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
  public isUploading: boolean;

  public fileUploadError: string;

  public constructor(private paperService: PaperService) {
    this.isUploading = false;
    this.paperUploadedEvent = new EventEmitter<Array<IPage>>();

    this.fileUploadError = '';
  }

  public ngOnInit(): void {
  }

  public onFileChange(fileInput: any): void {
    this.fileData = fileInput.target.files[0] as File;
  }

  public onUpload(): void {
    this.isUploading = true;
    this.paperService.uploadFile(this.paperId, this.fileData)
      .subscribe(pages => this.onUploadSuccess(pages), () => this.onUploadingFailure('Failed to upload file; please try again later'));
  }

  private onUploadSuccess(pages: Array<IPage>): void {
    this.paperUploadedEvent.emit(pages);
    this.isUploading = false;
  }

  private onUploadingFailure(error: string): void {
    this.fileUploadError = error;
    this.isUploading = false;
  }
}
