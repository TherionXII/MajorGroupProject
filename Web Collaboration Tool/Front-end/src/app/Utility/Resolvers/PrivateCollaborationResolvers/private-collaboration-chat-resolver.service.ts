import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {IMessage} from '../../Interfaces/IMessage';
import {EMPTY, forkJoin, Observable} from 'rxjs';
import {ThreadService} from '../../../PrivateCollaboration/Services/thread.service';
import {catchError, first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrivateCollaborationChatResolverService implements Resolve<[Array<IMessage>, string, string]> {
  constructor(private threadService: ThreadService) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<[Array<IMessage>, string, string]> | Observable<never> {
    return forkJoin([
      this.threadService.getMessagesForThread(route.paramMap.get('id'))
                             .pipe(first(), catchError(() => this.onFail())),
      `/topic/user/collaboration/chat/${route.paramMap.get('id')}`,
      `/app/user/collaboration/chat/${route.paramMap.get('id')}`
    ]);
  }

  private onFail(): Observable<never> {
    return EMPTY;
  }
}
