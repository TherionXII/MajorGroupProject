import { Injectable } from '@angular/core';
import {IQuery} from '../../query-feature/Interfaces/IQuery';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {QueryService} from '../../query-feature/services/query.service';
import {EMPTY, Observable, of} from 'rxjs';
import {mergeMap, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserQueryResolverService implements Resolve<IQuery[]>{
  constructor(private queryService: QueryService,
              private router: Router) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IQuery[]> | Observable<never> {
    return this.queryService.getRecentQueriesForUser(route.paramMap.get('username'))
                            .pipe(take(1), mergeMap(queries => {
                              if(queries) return of(queries);
                              else return this.onFail(route.paramMap.get('username'))
                            }));
  }

  private onFail(username: string): Observable<never> {
    if(username !== localStorage.getItem('username'))
      this.router.navigate([`/user/${localStorage.getItem('username')}`]);
    else {
      localStorage.clear();
      this.router.navigate(['/'])
    }
    return EMPTY;
  }
}
