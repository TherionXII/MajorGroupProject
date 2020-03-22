import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {RequestService} from '../../../PrivateCollaboration/Services/request.service';
import {EMPTY, Observable} from 'rxjs';
import {catchError, first} from 'rxjs/operators';
import {IPrivateCollaborationRequest} from '../../Interfaces/IPrivateCollaborationRequest';

@Injectable({
  providedIn: 'root'
})
export class PrivateCollaborationRequestResolverService implements Resolve<Array<IPrivateCollaborationRequest>> {
  constructor(private requestService: RequestService,
              private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<IPrivateCollaborationRequest>> | Observable<never> {
    return this.requestService.getPrivateCollaborationRequestsForUser(localStorage.getItem('username'))
                              .pipe(first(), catchError(() => this.onFail()));
  }

  private onFail(): Observable<never> {
    console.log('Failed to retrieve messages');

    return EMPTY;
  }
}
