import { Injectable } from '@angular/core';
import {IGroup} from '../../../GroupCollaboration/Interfaces/IGroup';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, forkJoin, Observable} from 'rxjs';
import {GroupService} from '../../../GroupCollaboration/Services/group.service';
import {catchError, first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupCollaborationResolverService implements Resolve<Array<IGroup>> {
  constructor(private groupService: GroupService,
              private router: Router) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    return forkJoin([
      this.groupService.getUserGroups(localStorage.getItem('username'))
                       .pipe(first(), catchError(() => this.onFail())),
      this.groupService.getGroupInvitationsForUser(localStorage.getItem('username'))
                       .pipe(first(), catchError(() => this.onFail()))
      ]);
  }

  private onFail(): Observable<never> {
    this.router.navigateByUrl('/user/' + localStorage.getItem('username'));

    return EMPTY;
  }
}
