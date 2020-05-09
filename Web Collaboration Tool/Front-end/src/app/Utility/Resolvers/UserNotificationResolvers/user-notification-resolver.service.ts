import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {INotification} from '../../Interfaces/INotification';
import {Observable, throwError} from 'rxjs';
import {NotificationService} from '../../Services/notification.service';
import {catchError, first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserNotificationResolverService implements Resolve<INotification[]> {
  constructor(private notificationsService: NotificationService) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<INotification>> {
    return this.notificationsService.getAllNotificationsForUser(localStorage.getItem('username'))
      .pipe(first(), catchError(() => throwError('Failed to retrieve notifications; please try again later')));
  }
}
