import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {IPrivateCollaboration} from '../../../private-collaborations/Interfaces/IPrivateCollaboration';
import {EMPTY, Observable} from 'rxjs';
import {PrivateCollaborationService} from '../../../private-collaborations/Services/private-collaboration.service';
import {catchError, first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrivateCollaborationResolverService implements Resolve<Array<IPrivateCollaboration>> {
  constructor(private privateCollaborationService: PrivateCollaborationService,
              private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<IPrivateCollaboration>> | Promise<Array<IPrivateCollaboration>> | Array<IPrivateCollaboration> {
    return this.privateCollaborationService.getAllPrivateCollaborationsForUser(localStorage.getItem('username'))
                                           .pipe(first(), catchError(() => this.onFail()));
  }

  private onFail(): Observable<never> {
    this.router.navigate([`/user/${localStorage.getItem('username')}`]);

    return EMPTY;
  }
}
