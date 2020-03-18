import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {IMessage} from '../../Interfaces/IMessage';
import {EMPTY, Observable} from 'rxjs';
import {ThreadService} from '../../../PrivateCollaboration/Services/thread.service';
import {catchError, first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrivateCollaborationChatResolverService implements Resolve<Array<IMessage>> {
  constructor(private threadService: ThreadService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<IMessage>> | Observable<never> {
    return this.threadService.getMessagesForThread(route.paramMap.get('id'))
                             .pipe(first(), catchError(() => this.onFail()))
  }

  private onFail(): Observable<never> {
    console.log('Failed to retrieve messages');

    return EMPTY;
  }
}
