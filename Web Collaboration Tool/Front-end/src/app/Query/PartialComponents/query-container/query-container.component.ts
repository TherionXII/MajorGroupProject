import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IQuery} from '../../Interfaces/IQuery';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {QueryService} from '../../Services/query.service';
import {IResponse} from '../../Interfaces/IResponse';

@Component({
  selector: 'app-query-container',
  templateUrl: './query-container.component.html',
  styleUrls: ['./query-container.component.css']
})
export class QueryContainerComponent implements OnInit {
  @Input()
  public response: IResponse;

  public errorMessage: string;

  constructor() {
    this.errorMessage = '';
  }

  public ngOnInit() {
  }

  public onQueryVote(response: IResponse): void {
    this.response = response;
  }

  public onQueryVoteFailure(error: string): void {
    this.errorMessage = error;
  }
}
