import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {IQuery} from '../../../Query/Interfaces/IQuery';
import {forkJoin, NEVER, Observable, of} from 'rxjs';
import {QueryService} from '../../../Query/Services/query.service';
import {catchError, first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForumResolverService implements Resolve<[Array<IQuery>, boolean]> {
  constructor(private queryService: QueryService,
              private router: Router) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<[Array<IQuery>, boolean]> | Observable<never> {
    if(route.paramMap.get('groupId'))
      return forkJoin([
        this.queryService.getRecentGroupQueries(route.paramMap.get('groupId')).pipe(first(), catchError(() => this.onFail())),
        of(false)
      ]);
    else
      return forkJoin([
        this.queryService.getRecentPublicQueries().pipe(first(), catchError(() => this.onFail())),
        of(true)
      ]);
  }

  private onFail(): Observable<never> {
    this.router.navigateByUrl('/');

    return NEVER;
  }
}
