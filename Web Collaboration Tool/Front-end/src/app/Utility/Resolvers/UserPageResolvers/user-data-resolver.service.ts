import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, forkJoin, Observable} from 'rxjs';
import {UserService} from '../../../user-feature/Services/user.service';
import {catchError, first} from 'rxjs/operators';
import {QueryService} from '../../../query-feature/services/query.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataResolverService implements Resolve<any> {
  constructor(private userService: UserService,
              private queryService: QueryService,
              private router: Router) {}

  public resolve(route: ActivatedRouteSnapshot, snapshot: RouterStateSnapshot): Observable<any> | Observable<never> {
    return forkJoin([
      this.userService.getUserProfile(route.paramMap.get('username'))
                      .pipe(first(), catchError(() => this.onFail(route.paramMap.get('username')))),
      this.queryService.getRecentQueriesForUser(route.paramMap.get('username'))
                       .pipe(first(), catchError(() => this.onFail(route.paramMap.get('username')))),
      this.queryService.getRecentResponsesForUser(route.paramMap.get('username'))
                       .pipe(first(), catchError(() => this.onFail(route.paramMap.get('username'))))
    ])
  }

  private onFail(username: string): Observable<never> {
    if(username !== localStorage.getItem('username')) {
      this.router.navigate([`/user/${localStorage.getItem('username')}`]);
    } else {
      localStorage.clear();
      this.router.navigate(['/'])
    }
    return EMPTY;
  }
}
