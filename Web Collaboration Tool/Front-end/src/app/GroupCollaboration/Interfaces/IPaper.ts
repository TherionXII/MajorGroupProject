import {ProcessedPaperQuestion} from './PaperQuestion';
import {IPage} from './IPage';

export class IPaper {
  id: number;

  pages: Array<IPage>;
  questions: Array<ProcessedPaperQuestion>;
}
