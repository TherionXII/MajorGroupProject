import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {RequestService} from '../../../private-collaborations/Services/request.service';
import {EMPTY, Observable} from 'rxjs';
import {catchError, first} from 'rxjs/operators';
import {IRequest} from '../../../auxiliary-module/IRequest';

@Injectable({
  providedIn: 'root'
})
export class PrivateCollaborationRequestResolverService implements Resolve<Array<IRequest>> {
  constructor(private requestService: RequestService,
              private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<IRequest>> | Observable<never> {
    return this.requestService.getPrivateCollaborationRequestsForUser(localStorage.getItem('username'))
                              .pipe(first(), catchError(() => this.onFail()));
  }

  private onFail(): Observable<never> {
    console.log('Failed to retrieve messages');

    return EMPTY;
  }
}
