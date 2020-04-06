import {IQuestionImage} from './IQuestionImage';

export class ExtractedPaperQuestion {
  public pageNumber: number;

  public questionPosition: any;

  public questionImage?: IQuestionImage;
}

export class ProcessedPaperQuestion {
  public text: string;

  public image?: any;
}
