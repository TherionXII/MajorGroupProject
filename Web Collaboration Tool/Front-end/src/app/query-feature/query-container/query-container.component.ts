import {Component, Input, OnInit} from '@angular/core';
import {IQuery} from '../Interfaces/IQuery';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {QueryService} from '../services/query.service';

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
      response: new FormControl('', Validators.required)
    });
  }

  public onRespond(): void {
    this.isReplyVisible = !this.isReplyVisible;
  }

  public onSubmit(id: number): void {
    this.queryService.submitResponse(this.queryResponse.get('response').value, localStorage.getItem('username'), id)
      .subscribe(() => this.queryService.getQueryById(id)
        .subscribe(query => this.query = query));

    this.onRespond();
  }

  public onUpvote(id: number): void {
    this.queryService.submitVote(true, localStorage.getItem('username'), id)
      .subscribe(updatedQuery => this.query = updatedQuery, error => console.log(error));
  }

  public onDownvote(id: number): void {
    this.queryService.submitVote(false, localStorage.getItem('username'), id)
      .subscribe(updatedQuery => this.query = updatedQuery, error => console.log(error));
  }
}
