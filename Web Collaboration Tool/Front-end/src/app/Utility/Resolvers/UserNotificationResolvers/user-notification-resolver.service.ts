import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {INotification} from '../../../auxiliary-module/Interfaces/INotification';
import {EMPTY, Observable} from 'rxjs';
import {NotificationService} from '../../../auxiliary-module/services/notification.service';
import {catchError, first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserNotificationResolverService implements Resolve<INotification[]> {
  constructor(private notificationsService: NotificationService,
              private router: Router) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INotification[]> | Promise<INotification[]> | INotification[] {
    return this.notificationsService.getAllNotificationsForUser(localStorage.getItem('username'))
                                    .pipe(first(), catchError(() => this.onFail()));
  }

  private onFail(): Observable<never> {
    this.router.navigate([`/user/${localStorage.getItem('username')}`]);

    return EMPTY;
  }
}
