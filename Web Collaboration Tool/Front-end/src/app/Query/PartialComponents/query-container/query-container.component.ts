import {Component, Input, OnInit} from '@angular/core';
import {IQuery} from '../../Interfaces/IQuery';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {QueryService} from '../../Services/query.service';

@Component({
  selector: 'app-query-container',
  templateUrl: './query-container.component.html',
  styleUrls: ['./query-container.component.css']
})
export class QueryContainerComponent implements OnInit {
  @Input()
  public query: IQuery;

  public isReplyVisible: boolean;

  public queryResponseForm: FormGroup;

  public errorMessage: string;

  constructor(private queryService: QueryService) {
    this.isReplyVisible = false;
    this.errorMessage = '';
  }

  public ngOnInit() {
    this.queryResponseForm = new FormGroup({
      contents: new FormControl('', Validators.required)
    });
  }

  public onQueryVote(query: IQuery): void {
    this.query = query;
  }

  public onQueryVoteFailure(error: string): void {
    this.errorMessage = error;
  }

  public onRespond(): void {
    this.isReplyVisible = !this.isReplyVisible;
  }

  public onSubmit(id: number): void {
    this.queryService.createResponse(id, localStorage.getItem('username'), this.queryResponseForm.getRawValue() as IQuery)
      .subscribe(query => this.query = query, error => this.errorMessage = error.message);

    this.onRespond();
  }
}
