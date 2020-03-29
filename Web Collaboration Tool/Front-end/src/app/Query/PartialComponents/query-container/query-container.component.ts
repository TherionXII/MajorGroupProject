import {Component, Input, OnInit} from '@angular/core';
import {IQuery} from '../../Interfaces/IQuery';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {QueryService} from '../../Services/query.service';
import {IQueryVote} from '../../Interfaces/IQueryVote';

@Component({
  selector: 'app-query-container',
  templateUrl: './query-container.component.html',
  styleUrls: ['./query-container.component.css']
})
export class QueryContainerComponent implements OnInit {
  @Input()
  public query: IQuery;

  public isReplyVisible = false;

  public queryResponseForm: FormGroup;

  public submissionError: string;

  constructor(private queryService: QueryService) {}

  ngOnInit() {
    this.queryResponseForm = new FormGroup({
      contents: new FormControl('', Validators.required)
    });
  }

  public onRespond(): void {
    this.isReplyVisible = !this.isReplyVisible;
  }

  public onSubmit(id: number): void {
    this.queryService.createResponse(this.queryResponseForm.getRawValue() as IQuery, localStorage.getItem('username'), id)
      .subscribe(query => this.query = query, error => this.submissionError = error.message);

    this.onRespond();
  }

  public onVote(query: IQuery, vote: boolean): void {
    this.queryService.submitVote({ vote, username: localStorage.getItem('username'), queryId: query.id }, query.id)
      .subscribe(updatedQuery => this.query = updatedQuery, error => this.submissionError = error.message);
  }
}
