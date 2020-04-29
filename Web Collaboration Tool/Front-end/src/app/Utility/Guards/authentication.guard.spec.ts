import { TestBed } from '@angular/core/testing';

import { AuthenticationGuard } from './authentication.guard';
import {RouterTestingModule} from '@angular/router/testing';
import {Type} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';

describe('AuthenticationGuardGuard', () => {
  let guard: AuthenticationGuard;

  let activatedRouteSnapshot: ActivatedRouteSnapshot;
  let routerStateSnapshot: RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]) ]
    });
  });

  beforeEach(() => guard = TestBed.inject(AuthenticationGuard as Type<AuthenticationGuard>));

  beforeEach( () => {
    let store = {};

    spyOn(localStorage, 'getItem').and.callFake((key) => store[key]);
    spyOn(localStorage, 'setItem').and.callFake( (key, value) => store[key] = value + '');
    spyOn(localStorage, 'clear').and.callFake(() => store = {});
  });

  beforeEach(() => {
    activatedRouteSnapshot = TestBed.inject(ActivatedRoute as Type<ActivatedRoute>).snapshot;
    routerStateSnapshot = TestBed.inject(Router as Type<Router>).routerState.snapshot;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if user is not in session and should be redirected to the home page', () => {
    localStorage.clear();

    const result = guard.canActivate(activatedRouteSnapshot, routerStateSnapshot);

    expect(result).toBeTrue();
  });

  it('should redirect to the user page when username is in session', async() => {
    localStorage.setItem('username', 'username');

    const navigateByUrlSpy = spyOn(TestBed.inject(Router as Type<Router>), 'navigateByUrl');
    await guard.canActivate(activatedRouteSnapshot, routerStateSnapshot);

    expect(navigateByUrlSpy).toHaveBeenCalledWith('/user/username');
  });
});
