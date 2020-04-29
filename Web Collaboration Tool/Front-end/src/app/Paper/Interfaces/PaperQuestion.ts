import {IQuestionImage} from './IQuestionImage';
import {IPosition} from './IPosition';

export class PaperQuestion {
  public id?: number;

  public text?: string;

  public answer?: string;

  public questionPosition?: IPosition;

  public questionImage?: IQuestionImage;

  public pageNumber?: number;
}
