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
  private topicSubscription: Subscription;

  constructor(private rxStompService: RxStompService,
              private notificationsService: NotificationsService) { }

  public ngOnInit(): void {
    this.topicSubscription = this.rxStompService.watch(`/topic/user/collaboration/request/${localStorage.getItem('username')}`)
      .subscribe(request => this.showCollaborationRequest(JSON.parse(request.body)));
  }

  public ngOnDestroy(): void {
    this.topicSubscription.unsubscribe();
  }

  private showCollaborationRequest(collaborationRequest: ICollaborationRequest): void {
    this.notificationsService.info('You have a new collaboration request!', `User ${collaborationRequest.sender} sent you a collaboration request`);
  }
}
