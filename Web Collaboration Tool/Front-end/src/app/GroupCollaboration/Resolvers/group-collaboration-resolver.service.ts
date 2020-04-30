import { Injectable } from '@angular/core';
import {IGroup} from '../Interfaces/IGroup';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable, throwError} from 'rxjs';
import {GroupService} from '../Services/group.service';
import {catchError, first} from 'rxjs/operators';
import {IGroupCollaborationRequest} from '../../Utility/Interfaces/IGroupCollaborationRequest';

@Injectable({
  providedIn: 'root'
})
export class GroupCollaborationResolverService implements Resolve<[Array<IGroup>, Array<IGroupCollaborationRequest>]> {
  constructor(private groupService: GroupService) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<[Array<IGroup>, Array<IGroupCollaborationRequest>]> {
    return forkJoin([
      this.groupService.getUserGroups(localStorage.getItem('username'))
                       .pipe(first(), catchError(() => throwError('Failed to retrieve group data; please try again later'))),
      this.groupService.getGroupInvitationsForUser(localStorage.getItem('username'))
                       .pipe(first(), catchError(() => throwError('Failed to retrieve group data; please try again later')))
      ]);
  }
}
