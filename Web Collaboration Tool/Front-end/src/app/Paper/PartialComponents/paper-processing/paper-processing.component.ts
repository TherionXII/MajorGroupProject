import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CropperPosition, ImageCroppedEvent, ImageCropperComponent} from 'ngx-image-cropper';
import {PaperService} from '../../Services/paper.service';
import {IPaperQuestion} from '../../Interfaces/IPaperQuestion';
import {IPaper} from '../../Interfaces/IPaper';
import {MatHorizontalStepper} from '@angular/material/stepper';
import {IPosition} from '../../Interfaces/IPosition';
import {IPage} from '../../Interfaces/IPage';

@Component({
  selector: 'app-pdf-processing',
  templateUrl: './paper-processing.component.html',
  styleUrls: ['./paper-processing.component.css']
})
export class PaperProcessingComponent implements OnInit {
  @ViewChild('horizontalStepper')
  public horizontalStepper: MatHorizontalStepper;

  @Input()
  private groupId: number;

  public paper: IPaper;

  public processedPaperQuestions: Array<IPaperQuestion>;
  public currentQuestion: IPaperQuestion;

  public currentPage: IPage;

  public userWarning: string;

  public isSelectingText = true;

  @ViewChild(ImageCropperComponent, {static: false}) imageCropper: ImageCropperComponent;

  constructor(private paperService: PaperService) {
    this.processedPaperQuestions = new Array<IPaperQuestion>();
    this.paper = new IPaper();
  }

  public ngOnInit(): void {
  }

  public onPaperCreation(event: IPaper): void {
    this.paper = event;

    this.horizontalStepper.next();
  }

  public onPaperUpload(event: Array<IPage>): void {
    this.paper.pages = event;
    this.currentPage = this.paper.pages[0];

    this.horizontalStepper.next();
  }

  public onPageChange(event): void {
    this.currentPage = this.paper.pages[event.index];
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
    this.paperService.processQuestion(this.currentQuestion, this.paper.id)
      .subscribe(processedQuestion => this.processedPaperQuestions.push(processedQuestion));

    this.currentQuestion = {} as IPaperQuestion;
  }

  private cropText(imagePosition: CropperPosition, pageNumber: number): void {
    this.currentQuestion.pageNumber = pageNumber;
    this.currentQuestion.questionPosition = imagePosition as IPosition;
  }

  private cropImage(imagePosition: CropperPosition, image: string) {
    this.currentQuestion.questionImage = { imagePosition, image };
  }
}
