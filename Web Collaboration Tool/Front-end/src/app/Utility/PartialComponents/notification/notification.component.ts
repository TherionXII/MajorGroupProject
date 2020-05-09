import {Component, OnDestroy, OnInit} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Subscription} from 'rxjs';
import {NotificationsService} from 'angular2-notifications';
import {INotification} from '../../Interfaces/INotification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {
  private notificationSubscription: Subscription;

  constructor(private rxStompService: RxStompService, private notificationsService: NotificationsService) {
    this.notificationSubscription = new Subscription();
  }

  public ngOnInit(): void {
    this.notificationSubscription = this.rxStompService.watch(`/topic/user/notification/${localStorage.getItem('username')}`)
      .subscribe(request => this.showNotification(JSON.parse(request.body)));
  }

  public ngOnDestroy(): void {
    this.notificationSubscription.unsubscribe();
  }

  private showNotification(notification: INotification): void {
    this.notificationsService.info(notification.title, notification.content);
  }
}
