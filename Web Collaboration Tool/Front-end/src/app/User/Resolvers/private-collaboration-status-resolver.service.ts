import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {NotificationService} from '../../Utility/Services/notification.service';
import {PrivateCollaborationService} from '../../PrivateCollaboration/Services/private-collaboration.service';
import {forkJoin, Observable, throwError} from 'rxjs';
import {catchError, first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrivateCollaborationStatusResolverService implements Resolve<[boolean, boolean, boolean]> {
  constructor(private notificationsService: NotificationService,
              private privateCollaborationService: PrivateCollaborationService) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<[boolean, boolean, boolean]> {
    return forkJoin([
      this.notificationsService.hasSentCollaborationRequest(localStorage.getItem('username'), route.paramMap.get('username'))
        .pipe(first(), catchError(() => throwError('Failed to retrieve user data; please try again later'))),
      this.notificationsService.hasReceivedCollaborationRequest(localStorage.getItem('username'), route.paramMap.get('username'))
        .pipe(first(), catchError(() => throwError('Failed to retrieve user data; please try again later'))),
      this.privateCollaborationService.isCollaborating(localStorage.getItem('username'), route.paramMap.get('username'))
        .pipe(first(), catchError(() => throwError('Failed to retrieve user data; please try again later')))
    ]);
  }
}
