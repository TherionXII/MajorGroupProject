import { Component, OnInit } from '@angular/core';
import {IQuery} from '../../../Query/Interfaces/IQuery';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-recent-user-responses',
  templateUrl: './recent-user-responses.component.html',
  styleUrls: ['./recent-user-responses.component.css']
})
export class RecentUserResponsesComponent implements OnInit {
  public userResponses: Array<IQuery>;

  public resolverError: string;

  constructor(private activatedRoute: ActivatedRoute) {
    this.userResponses = new Array<IQuery>();
    this.resolverError = '';
  }

  public ngOnInit(): void {
    this.activatedRoute.data
      .subscribe((data: { userData: [ any, Array<IQuery> ] }) => this.userResponses = data.userData[1],
                 error => this.resolverError = error);
  }

  public getOwnerUsername(response: IQuery): string {
    while (response.parent != null) {
      response = response.parent;
    }

    return response.username;
  }
}
