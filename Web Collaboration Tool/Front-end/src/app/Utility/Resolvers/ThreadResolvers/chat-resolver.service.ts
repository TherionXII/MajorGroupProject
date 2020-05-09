import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {IMessage} from '../../Interfaces/IMessage';
import {forkJoin, Observable, of, throwError} from 'rxjs';
import {ThreadService} from '../../Services/thread.service';
import {catchError, first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatResolverService implements Resolve<[Array<IMessage>, string, string]> {
  constructor(private threadService: ThreadService) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<[ Array<IMessage>, string, string ]> {
    return forkJoin([
      this.threadService.getMessagesForThread(route.paramMap.get('threadId'))
        .pipe(first(), catchError(() => throwError('Failed to retrieve chat data; please try again later'))),
      of(`/topic/user/collaboration/chat/${route.paramMap.get('threadId')}`),
      of(`/app/user/collaboration/chat/${route.paramMap.get('threadId')}`)
    ]);
  }
}
