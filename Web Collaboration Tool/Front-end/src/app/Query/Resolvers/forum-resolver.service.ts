import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {IQuery} from '../Interfaces/IQuery';
import {forkJoin, Observable, of, throwError} from 'rxjs';
import {QueryService} from '../Services/query.service';
import {catchError, first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForumResolverService implements Resolve<[Array<IQuery>, boolean]> {
  constructor(private queryService: QueryService) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<[Array<IQuery>, boolean]> {
      return forkJoin([
        this.queryService.getRecentPublicQueries()
          .pipe(first(), catchError(() => throwError('Failed to retrieve forum data; please try again later'))),
        of(true)
      ]);
  }
}
