import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable, throwError} from 'rxjs';
import {catchError, first} from 'rxjs/operators';
import {QueryService} from '../../Query/Services/query.service';
import {IQuery} from '../../Query/Interfaces/IQuery';
import {IResponse} from '../../Query/Interfaces/IResponse';

@Injectable({
  providedIn: 'root'
})
export class UserDataResolverService implements Resolve<[ Array<IQuery>, Array<IResponse> ]> {
  constructor(private queryService: QueryService) {}

  public resolve(route: ActivatedRouteSnapshot, snapshot: RouterStateSnapshot): Observable<[ Array<IQuery>, Array<IResponse> ]> {
    return forkJoin([
      this.queryService.getRecentQueriesForUser(route.paramMap.get('username'))
        .pipe(first(), catchError(() => throwError('Failed to retrieve user data; please try again later'))),
      this.queryService.getRecentResponsesForUser(route.paramMap.get('username'))
        .pipe(first(), catchError(() => throwError('Failed to retrieve user data; please try again later')))
    ]);
  }
}
