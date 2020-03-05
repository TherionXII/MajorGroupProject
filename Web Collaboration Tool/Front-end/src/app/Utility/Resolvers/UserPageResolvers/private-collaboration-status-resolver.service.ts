import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {NotificationService} from '../../../auxiliary-module/services/notification.service';
import {PrivateCollaborationService} from '../../../private-collaborations/Services/private-collaboration.service';
import {EMPTY, forkJoin, Observable, pipe} from 'rxjs';
import {catchError, first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrivateCollaborationStatusResolverService implements Resolve<any> {
  constructor(private notificationsService: NotificationService,
              private privateCollaborationService: PrivateCollaborationService,
              private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    return forkJoin([
      this.notificationsService.hasSentCollaborationRequest(localStorage.getItem('username'), route.paramMap.get('username'))
                               .pipe(first(), catchError(() => this.onFail(route.paramMap.get('username')))),
      this.notificationsService.hasReceivedCollaborationRequest(localStorage.getItem('username'), route.paramMap.get('username'))
                               .pipe(first(), catchError(() => this.onFail(route.paramMap.get('username')))),
      this.privateCollaborationService.isCollaborating(localStorage.getItem('username'), route.paramMap.get('username'))
                                      .pipe(first(), catchError(() => this.onFail(route.paramMap.get('username'))))
    ]);
  }

  private onFail(username: string): Observable<never> {
    if(username !== localStorage.getItem('username')) {
      this.router.navigate([`/user/${localStorage.getItem('username')}`]);
    } else {
      localStorage.clear();
      this.router.navigate(['/'])
    }
    return EMPTY;
  }
}
