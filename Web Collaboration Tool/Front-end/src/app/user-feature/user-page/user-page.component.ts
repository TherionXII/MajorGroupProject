import { Component, OnInit } from '@angular/core';
import {UserService} from '../Services/user.service';
import {IUserProfile} from '../Interfaces/IUserProfile';
import {ActivatedRoute} from '@angular/router';
import {QueryService} from '../../query-feature/services/query.service';
import {IQuery} from '../../query-feature/Interfaces/IQuery';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  public username: string;
  public userProfile: IUserProfile;

  public userQueries: Array<IQuery>;
  public userResponses: Array<IQuery>;

  public initError: string;

  constructor(private userService: UserService,
              private queryService: QueryService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');

    this.userService.getUserProfile(this.username)
      .subscribe(userProfile => this.userProfile = userProfile, error => this.initError = error.message);

    this.queryService.getRecentQueriesForUser(this.username)
      .subscribe(queries => this.userQueries = queries, error => this.initError = error.message);

    this.queryService.getRecentResponsesForUser(this.username)
      .subscribe(responses => this.userResponses = responses, error => this.initError = error.message);
  }

  public getOwnerUsername(response: IQuery): string {
    while (response.parent != null) {
      response = response.parent;
    }

    return response.user.username;
  }
}
