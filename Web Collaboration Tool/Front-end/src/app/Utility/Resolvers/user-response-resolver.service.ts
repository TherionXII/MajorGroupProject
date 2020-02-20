import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {IQuery} from '../../query-feature/Interfaces/IQuery';
import {EMPTY, Observable, of} from 'rxjs';
import {QueryService} from '../../query-feature/services/query.service';
import {mergeMap, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserResponseResolverService implements Resolve<IQuery[]>{
  constructor(private queryService: QueryService,
              private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IQuery[]> | Observable<never> {
    return this.queryService.getRecentResponsesForUser(route.paramMap.get('username'))
                            .pipe(take(1), mergeMap(responses => {
                              if(responses) return of(responses);
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
