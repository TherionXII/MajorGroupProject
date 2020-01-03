import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {IUserProfile} from '../Interfaces/IUserProfile';
import {ActivatedRoute} from '@angular/router';
import {QueryService} from '../services/query.service';
import {IQuery} from '../Interfaces/IQuery';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  public username: string;
  public userInformation: IUserProfile;

  public userQueries: Array<IQuery>;
  public userResponses: Array<IQuery>;

  constructor(private userService: UserService,
              private queryService: QueryService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.userService.getUserProfile(this.route.snapshot.paramMap.get('username'))
      .subscribe(response => this.userInformation = response, error => console.log(error));
    this.username = localStorage.getItem('username');

    this.queryService.getRecentQueriesForUser(this.username)
      .subscribe(queries => this.userQueries = queries, error => console.log(error));

    this.userResponses = new Array<IQuery>();
    this.queryService.getRecentResponsesForUser(this.username)
      .subscribe(responses => responses.forEach(id => this.queryService.getQueryById(id)
        .subscribe(response => this.userResponses.push(response), error => console.log(error))),
          error => console.log(error));
  }

  public getParent(response: IQuery): IQuery {
    while (response.parent != null) {
      response = response.parent;
    }

    return response;
  }
}
