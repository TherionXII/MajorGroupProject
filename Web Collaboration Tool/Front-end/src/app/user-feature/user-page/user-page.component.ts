import { Component, OnInit } from '@angular/core';
import {IUserProfile} from '../Interfaces/IUserProfile';
import {ActivatedRoute} from '@angular/router';
import {IQuery} from '../../query-feature/Interfaces/IQuery';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  public userProfile: IUserProfile;

  public userQueries: Array<IQuery>;
  public userResponses: Array<IQuery>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((data: { userProfile: IUserProfile, queries: Array<IQuery>, responses: Array<IQuery> }) => {
      this.userProfile = data.userProfile;
      this.userQueries = data.queries;
      this.userResponses = data.responses;
    });
  }

  public getOwnerUsername(response: IQuery): string {
    while (response.parent != null) {
      response = response.parent;
    }

    return response.user.username;
  }
}
