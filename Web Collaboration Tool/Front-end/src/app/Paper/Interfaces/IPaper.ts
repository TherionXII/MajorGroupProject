import {IPaperQuestion} from './IPaperQuestion';
import {IPage} from './IPage';

export class IPaper {
  id: number;

  pages: Array<IPage>;
  questions: Array<IPaperQuestion>;

  paperName: string;
  paperDescription: string;
}
