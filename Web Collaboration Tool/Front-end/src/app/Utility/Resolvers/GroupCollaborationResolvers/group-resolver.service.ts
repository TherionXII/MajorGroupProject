import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {IGroup} from '../../../GroupCollaboration/Interfaces/IGroup';
import {GroupService} from '../../../GroupCollaboration/Services/group.service';
import {forkJoin, NEVER, Observable} from 'rxjs';
import {catchError, first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupResolverService implements Resolve<IGroup> {
  constructor(private groupService: GroupService,
              private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    return forkJoin([
      this.groupService.getGroupById(route.paramMap.get('id'))
                       .pipe(first(), catchError(() => this.onFail())),
      this.groupService.getGroupInvitationsForGroup(route.paramMap.get('id'))
    ]);
  }

  private onFail(): Observable<never> {
    this.router.navigateByUrl('/groups');

    return NEVER;
  }
}
