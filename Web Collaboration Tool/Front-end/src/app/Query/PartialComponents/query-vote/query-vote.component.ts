import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IQuery} from '../../Interfaces/IQuery';
import {QueryService} from '../../Services/query.service';
import {IResponse} from '../../Interfaces/IResponse';

@Component({
  selector: 'app-query-vote',
  templateUrl: './query-vote.component.html',
  styleUrls: ['./query-vote.component.css']
})
export class QueryVoteComponent implements OnInit {
  @Input()
  public response: IResponse;

  @Output()
  public queryVotedEvent: EventEmitter<IResponse>;

  @Output()
  public queryVoteFailedEvent: EventEmitter<string>;

  constructor(private queryService: QueryService) {
    this.queryVotedEvent = new EventEmitter<IResponse>();
    this.queryVoteFailedEvent = new EventEmitter<string>();
  }

  public ngOnInit(): void {
  }

  public onVote(vote: boolean): void {
    this.queryService.submitVote({ vote, username: localStorage.getItem('username'), queryId: this.response.id })
      .subscribe(updatedQuery => this.onSuccessfulVote(updatedQuery), () => this.onFailedVote());
  }

  private onSuccessfulVote(updatedQuery: IResponse): void {
    this.response = updatedQuery;
    this.queryVotedEvent.emit(this.response);
  }

  private onFailedVote(): void {
    this.queryVoteFailedEvent.emit('Failed to vote for the query; please try again later');
  }
}
