import {Component, OnDestroy, OnInit} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Subscription} from 'rxjs';
import {NotificationsService} from 'angular2-notifications';
import {ICollaborationRequest} from '../Interfaces/ICollaborationRequest';

@Component({
  selector: 'app-notification-module',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {
  private collaborationRequestSubscription: Subscription;
  private collaborationResponseSubscription: Subscription;

  constructor(private rxStompService: RxStompService,
              private notificationsService: NotificationsService) { }

  public ngOnInit(): void {
    this.collaborationRequestSubscription = this.rxStompService.watch(`/topic/user/collaboration/request/${localStorage.getItem('username')}`)
      .subscribe(request => this.showCollaborationRequest(JSON.parse(request.body)));

    this.collaborationResponseSubscription = this.rxStompService.watch(`/topic/user/collaboration/response/${localStorage.getItem('username')}`)
      .subscribe(response => this.showCollaborationResponse(JSON.parse(response.body)));
  }

  public ngOnDestroy(): void {
    this.collaborationRequestSubscription.unsubscribe();
  }

  private showCollaborationRequest(collaborationRequest: ICollaborationRequest): void {
    this.notificationsService.info('You have a new collaboration request!', `User ${collaborationRequest.sender} sent you a collaboration request`);
  }

  private showCollaborationResponse(collaborationResponse: ICollaborationRequest): void {
    if(collaborationResponse.accepted)
      this.notificationsService.info('A user responded to your collaboration request!', `User ${collaborationResponse.sender} has accepted your request`);
    else
      this.notificationsService.info('A user responded to your collaboration request!', `User ${collaborationResponse.sender} has refused your request`);
  }
}
