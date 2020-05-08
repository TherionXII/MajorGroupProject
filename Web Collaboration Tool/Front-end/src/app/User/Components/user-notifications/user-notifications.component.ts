import { Component, OnInit } from '@angular/core';
import {INotification} from '../../../Utility/Interfaces/INotification';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-notifications',
  templateUrl: './user-notifications.component.html',
  styleUrls: ['./user-notifications.component.css']
})
export class UserNotificationsComponent implements OnInit {
  public notifications: Array<INotification>;

  public resolverError: string;

  constructor(private route: ActivatedRoute) {
    this.notifications = new Array<INotification>();
    this.resolverError = '';
  }

  ngOnInit(): void {
    this.route.data
      .subscribe((data: { notifications: Array<INotification> }) => this.notifications = data.notifications,
                 error => this.resolverError = error);
  }
}
