import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ImageCroppedEvent, ImageCropperComponent} from 'ngx-image-cropper';
import {FileUploadService} from '../../Services/file-upload.service';
import {ExtractedPaperQuestion, ProcessedPaperQuestion} from '../../Interfaces/PaperQuestion';
import {DomSanitizer} from '@angular/platform-browser';
import {IPaper} from '../../Interfaces/IPaper';
import {IPage} from '../../Interfaces/IPage';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @Input()
  private groupId: number;

  public paper: IPaper;
  public currentPage: IPage;

  public processedPaperQuestions: Array<ProcessedPaperQuestion>;
  public currentQuestion: ExtractedPaperQuestion;

  public userWarning: string;

  public isSelectingText = true;

  public fileData: File;
  public uploading = false;

  @ViewChild(ImageCropperComponent, {static: false}) imageCropper: ImageCropperComponent;

  constructor(private fileUploadService: FileUploadService) {
    this.processedPaperQuestions = new Array<ProcessedPaperQuestion>();
    this.currentQuestion = new ExtractedPaperQuestion();
    this.paper = new IPaper();
  }

  public ngOnInit(): void {
  }

  public onFileChange(fileInput: any): void {
    this.fileData = fileInput.target.files[0] as File;
  }

  public onUpload(): void {
    this.uploading = true;
    this.fileUploadService.uploadFile(this.fileData, this.groupId)
      .subscribe(paper => {
        this.uploading = false;
        this.paper = paper;
        this.currentPage = this.paper.pages[0];
      }, error => console.log(error));
  }

  public onSelectionTypeChange(): void {
    this.isSelectingText = !this.isSelectingText;
  }

  public onCrop(event: ImageCroppedEvent, pageNumber: number): void {
    if(this.isSelectingText)
      this.cropText(event.imagePosition, pageNumber);
    else
      this.cropImage(event.imagePosition, event.base64)
  }

  public onNextQuestion(): void {
    this.fileUploadService.uploadFileAndArea(this.currentQuestion, this.paper.id)
      .subscribe(processedQuestion => console.log(processedQuestion));

    this.currentQuestion = new ExtractedPaperQuestion();
  }

  public onPageChange(event): void {
    this.currentPage = this.paper.pages[event.index];
  }

  private cropText(imagePosition: any, pageNumber: number): void {
    this.currentQuestion.pageNumber = pageNumber;
    this.currentQuestion.questionPosition = imagePosition;
  }

  private cropImage(imagePosition: any, image: any) {
    if(this.currentQuestion.questionPosition === undefined) {
      this.userWarning = 'Please select text first';
      return;
    }

    this.currentQuestion.questionImage.imagePosition = imagePosition;
    this.currentQuestion.questionImage.image = image;
  }
}
