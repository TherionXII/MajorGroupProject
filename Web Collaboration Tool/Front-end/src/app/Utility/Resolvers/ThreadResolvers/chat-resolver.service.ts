import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {IMessage} from '../../Interfaces/IMessage';
import {EMPTY, forkJoin, Observable, of} from 'rxjs';
import {ThreadService} from '../../Services/thread.service';
import {catchError, first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatResolverService implements Resolve<[Array<IMessage>, string, string]> {
  constructor(private threadService: ThreadService) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<[Array<IMessage>, string, string]> | Observable<never> {
    return forkJoin([
      this.threadService.getMessagesForThread(route.paramMap.get('threadId')).pipe(first(), catchError(() => this.onFail())),
      of(`/topic/user/collaboration/chat/${route.paramMap.get('id')}`),
      of(`/app/user/collaboration/chat/${route.paramMap.get('id')}`)
    ]);
  }

  private onFail(): Observable<never> {
    console.log('FAILED');

    return EMPTY;
  }
}
