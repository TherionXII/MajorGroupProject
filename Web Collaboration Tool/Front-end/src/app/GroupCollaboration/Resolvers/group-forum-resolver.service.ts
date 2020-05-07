import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable, of, throwError} from 'rxjs';
import {catchError, first} from 'rxjs/operators';
import {QueryService} from '../../Query/Services/query.service';
import {IQuery} from '../../Query/Interfaces/IQuery';

@Injectable({
  providedIn: 'root'
})
export class GroupForumResolverService implements Resolve<[Array<IQuery>, boolean]>{

  constructor(private queryService: QueryService) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<[Array<IQuery>, boolean]> {
    return forkJoin([
      this.queryService.getRecentGroupQueries(route.paramMap.get('groupId'))
        .pipe(first(), catchError(() => throwError('Failed to retrieve forum data; please try again later'))),
      of(false)
    ]);
  }
}
