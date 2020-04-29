import {Component, OnDestroy, OnInit} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Subscription} from 'rxjs';
import {NotificationsService} from 'angular2-notifications';
import {INotification} from '../../Interfaces/INotification';

@Component({
  selector: 'app-notification-module',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {
  private collaborationRequestSubscription: Subscription;
  private collaborationResponseSubscription: Subscription;
  private groupCollaborationSubscription: Subscription;
  private groupSubscription: Subscription;

  constructor(private rxStompService: RxStompService,
              private notificationsService: NotificationsService) {}

  public ngOnInit(): void {
    this.collaborationRequestSubscription = this.rxStompService.watch(`/topic/user/collaboration/request/${localStorage.getItem('username')}`)
      .subscribe(request => this.showNotification(JSON.parse(request.body)));

    this.collaborationResponseSubscription = this.rxStompService.watch(`/topic/user/collaboration/response/${localStorage.getItem('username')}`)
      .subscribe(response => this.showNotification(JSON.parse(response.body)));

    this.groupCollaborationSubscription = this.rxStompService.watch(`/topic/user/collaboration/invitation/${localStorage.getItem('username')}`)
      .subscribe(request => this.showNotification(JSON.parse(request.body)));

    this.groupSubscription = this.rxStompService.watch(`/topic/user/collaboration/group/${localStorage.getItem('username')}`)
      .subscribe(notification => this.showNotification(JSON.parse(notification.body)));
  }

  public ngOnDestroy(): void {
    this.collaborationRequestSubscription.unsubscribe();
    this.collaborationResponseSubscription.unsubscribe();
  }

  private showNotification(notification: INotification): void {
    this.notificationsService.info(notification.title, notification.content);
  }
}
