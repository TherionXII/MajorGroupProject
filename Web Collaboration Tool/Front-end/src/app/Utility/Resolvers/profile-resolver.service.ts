import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {IUserProfile} from '../../user-feature/Interfaces/IUserProfile';
import {EMPTY, Observable, of} from 'rxjs';
import {UserService} from '../../user-feature/Services/user.service';
import {first, mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolverService implements Resolve<IUserProfile> {
  constructor(private userService: UserService,
              private router: Router) {}

  public resolve(route: ActivatedRouteSnapshot, snapshot: RouterStateSnapshot): Observable<IUserProfile> | Observable<never> {
    return this.userService.getUserProfile(route.paramMap.get('username'))
                           .pipe(first(), mergeMap(profile => {
                             if(profile) return of(profile);
                             else return this.onFail(route.paramMap.get('username'));
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
