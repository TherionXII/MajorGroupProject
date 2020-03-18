import { Component, OnInit } from '@angular/core';
import {IUserProfile} from '../../Interfaces/IUserProfile';
import {ActivatedRoute} from '@angular/router';
import {IQuery} from '../../../Query/Interfaces/IQuery';

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

  public ngOnInit(): void {
    this.route.data.subscribe((data: { userData: Array<any> }) => {
      this.userProfile = data.userData[0];
      this.userQueries = data.userData[1];
      this.userResponses = data.userData[2];
    });
  }

  public getOwnerUsername(response: IQuery): string {
    while (response.parent != null) {
      response = response.parent;
    }

    return response.user.username;
  }
}
