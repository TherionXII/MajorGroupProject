import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {IUserProfile} from '../Interfaces/IUserProfile';
import {UserService} from '../Services/user.service';
import {catchError, first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserProfileResolverService implements Resolve<IUserProfile> {
  constructor(private userService: UserService) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserProfile> {
    return this.userService.getUserProfile(localStorage.getItem('username'))
      .pipe(first(), catchError(() => throwError('Failed to retrieve user data; please try again later')));
  }
}
