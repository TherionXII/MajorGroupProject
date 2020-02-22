import { Component, OnInit } from '@angular/core';
import {IUserProfile} from '../Interfaces/IUserProfile';
import {ActivatedRoute} from '@angular/router';
import {IQuery} from '../../query-feature/Interfaces/IQuery';
import {RxStompService} from '@stomp/ng2-stompjs';
import {ICollaborationRequest} from '../../auxiliary-module/Interfaces/ICollaborationRequest';
import {UserService} from '../Services/user.service';
import {NotificationService} from '../../auxiliary-module/services/notification.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  public userProfile: IUserProfile;

  public userQueries: Array<IQuery>;
  public userResponses: Array<IQuery>;

  constructor(private route: ActivatedRoute,
              private rxStompService: RxStompService,
              private notificationsService: NotificationService) {}

  public ngOnInit(): void {
    this.route.data.subscribe((data: { userProfile: IUserProfile, queries: Array<IQuery>, responses: Array<IQuery> }) => {
      this.userProfile = data.userProfile;
      this.userQueries = data.queries;
      this.userResponses = data.responses;
    });
  }

  public onCollaborationRequest(): void {
    this.rxStompService.publish({ destination: '/app/user/collaboration/request', body: JSON.stringify(this.composeMessageBody()) });
  }

  public isLoggedInUser(): boolean {
    return localStorage.getItem('username') ? localStorage.getItem('username') !== this.userProfile.username : false;
  }

  public async hasSentRequest(): Promise<boolean> {
    return await this.notificationsService.hasSentCollaborationRequest(localStorage.getItem('username'), this.userProfile.username).toPromise();
  }

  public async hasReceivedRequest(): Promise<boolean> {
    return await this.notificationsService.hasReceivedCollaborationRequest(localStorage.getItem('username'), this.userProfile.username).toPromise();
  }

  public getOwnerUsername(response: IQuery): string {
    while (response.parent != null) {
      response = response.parent;
    }

    return response.user.username;
  }

  private composeMessageBody(): ICollaborationRequest {
    return { recipient: this.userProfile.username, sender: localStorage.getItem('username'), responded: false} as ICollaborationRequest;
  }
}
