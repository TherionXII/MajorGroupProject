import { Component, OnInit } from '@angular/core';
import {IQuery} from '../../../Query/Interfaces/IQuery';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-recent-user-queries',
  templateUrl: './recent-user-queries.component.html',
  styleUrls: ['./recent-user-queries.component.css']
})
export class RecentUserQueriesComponent implements OnInit {
  public userQueries: Array<IQuery>;

  public resolverError: string;

  constructor(private route: ActivatedRoute) {
    this.userQueries = new Array<IQuery>();
    this.resolverError = '';
  }

  public ngOnInit(): void {
    this.route.data
      .subscribe((data: { userData: [ Array<IQuery>, any ] }) => this.userQueries = data.userData[0],
                 error => this.resolverError = error);
  }
}
