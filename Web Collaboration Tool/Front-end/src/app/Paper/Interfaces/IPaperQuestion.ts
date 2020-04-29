import {IQuestionImage} from './IQuestionImage';
import {IPosition} from './IPosition';

export interface IPaperQuestion {
  id?: number;

  text?: string;

  answer?: string;

  questionPosition?: IPosition;

  questionImage?: IQuestionImage;

  pageNumber?: number;
}
