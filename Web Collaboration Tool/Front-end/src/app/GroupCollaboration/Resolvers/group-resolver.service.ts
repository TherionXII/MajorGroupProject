import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {IGroup} from '../Interfaces/IGroup';
import {GroupService} from '../Services/group.service';
import {forkJoin, Observable, throwError} from 'rxjs';
import {catchError, first} from 'rxjs/operators';
import {IGroupCollaborationRequest} from '../../Utility/Interfaces/IGroupCollaborationRequest';

@Injectable({
  providedIn: 'root'
})
export class GroupResolverService implements Resolve<[IGroup, Array<IGroupCollaborationRequest>]> {
  constructor(private groupService: GroupService) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<[IGroup, Array<IGroupCollaborationRequest>]> {
    return forkJoin([
      this.groupService.getGroupById(route.paramMap.get('groupId'))
                       .pipe(first(), catchError(() => throwError('Failed to retrieve group data; please try again later'))),
      this.groupService.getGroupInvitationsForGroup(route.paramMap.get('groupId'))
                       .pipe(first(), catchError(() => throwError('Failed to retrieve group data; please try again later')))
    ]);
  }
}
