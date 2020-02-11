import {Component, Input, OnInit} from '@angular/core';
import {IQuery} from '../Interfaces/IQuery';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {QueryService} from '../services/query.service';
import {IQueryVote} from '../Interfaces/IQueryVote';

@Component({
  selector: 'app-query-container',
  templateUrl: './query-container.component.html',
  styleUrls: ['./query-container.component.css']
})
export class QueryContainerComponent implements OnInit {
  @Input()
  public query: IQuery;

  public isReplyVisible = false;

  public queryResponse: FormGroup;

  constructor(private queryService: QueryService) { }

  ngOnInit() {
    this.queryResponse = new FormGroup({
      contents: new FormControl('', Validators.required)
    });
  }

  public onRespond(): void {
    this.isReplyVisible = !this.isReplyVisible;
  }

  public onSubmit(id: number): void {
    this.queryService.createResponse(this.queryResponse.getRawValue() as IQuery, localStorage.getItem('username'), id)
      .subscribe(() => this.queryService.getQueryById(id)
        .subscribe(query => this.query = query));

    this.onRespond();
  }

  public onUpvote(query: IQuery): void {
    this.queryService.submitVote({ vote: true, username: localStorage.getItem('username'), query } as IQueryVote)
      .subscribe(updatedQuery => this.query = updatedQuery, error => console.log(error));
  }

  public onDownvote(query: IQuery): void {
    this.queryService.submitVote({ vote: false, username: localStorage.getItem('username'), query } as IQueryVote)
      .subscribe(updatedQuery => this.query = updatedQuery, error => console.log(error));
  }
}
