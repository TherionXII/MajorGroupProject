import { Component, OnInit } from '@angular/core';
import {IQuery} from '../../../Query/Interfaces/IQuery';
import {ActivatedRoute} from '@angular/router';
import {IResponse} from '../../../Query/Interfaces/IResponse';

@Component({
  selector: 'app-recent-user-responses',
  templateUrl: './recent-user-responses.component.html',
  styleUrls: ['./recent-user-responses.component.css']
})
export class RecentUserResponsesComponent implements OnInit {
  public userResponses: Array<IResponse>;

  public resolverError: string;

  constructor(private activatedRoute: ActivatedRoute) {
    this.userResponses = new Array<IResponse>();
    this.resolverError = '';
  }

  public ngOnInit(): void {
    this.activatedRoute.data
      .subscribe((data: { userData: [ any, Array<IResponse> ] }) => this.userResponses = data.userData[1],
                 error => this.resolverError = error);
  }
}
