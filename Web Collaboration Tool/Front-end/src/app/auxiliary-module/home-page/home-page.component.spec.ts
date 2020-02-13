import { async, ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';

import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

import {AuxiliaryModule} from '../auxiliary.module';

import { HomePageComponent } from './home-page.component';

import { LoginService } from '../services/login.service';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  const loginService = jasmine.createSpyObj('LoginService', ['login']);
  const router = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AuxiliaryModule ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: LoginService, useValue: loginService },
        { provide: Router, useValue: router }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach( () => {
    let store = {};

    spyOn(localStorage, 'getItem').and.callFake((key) => store[key]);
    spyOn(localStorage, 'setItem').and.callFake( (key, value) => store[key] = value + '');
    spyOn(localStorage, 'clear').and.callFake(() => store = {});
  });

  afterEach(() => {
    loginService.login.calls.reset();
    router.navigateByUrl.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when all inputs are valid', () => {
    component.loginForm.get('username').setValue('username');
    component.loginForm.get('password').setValue('password');

    expect(component.loginForm.valid).toBe(true);
  });

  it('should have an invalid form when inputs are invalid', () => {
    component.loginForm.get('username').setValue('');
    component.loginForm.get('password').setValue('password');

    expect(component.loginForm.valid).toBe(false);

    component.loginForm.get('username').setValue('username');
    component.loginForm.get('password').setValue('');

    expect(component.loginForm.valid).toBe(false);
  });

  it('should navigateByUrl to user page on successful login and add username to session', () => {
    component.loginForm.get('username').setValue('username');
    component.loginForm.get('password').setValue('password');

    const loginSpy = loginService.login.and.returnValue(of('Ok'));
    const routerSpy = router.navigateByUrl.and.returnValue(Promise.resolve());
    component.onSubmit();

    expect(localStorage.getItem('username')).toBe('username');
    expect(component.loginError).toBeUndefined();

    expect(loginSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith('/user/' + localStorage.getItem('username'));
  });

  it('should set login error when login is unsuccessful', () => {
    component.loginForm.get('username').setValue('username');
    component.loginForm.get('password').setValue('password');

    const loginSpy = loginService.login.and.returnValue(throwError({ error: 'Could not find user with the specified credentials'}));
    const routerSpy = router.navigateByUrl.and.returnValue(Promise.resolve());
    component.onSubmit();

    expect(loginSpy).toHaveBeenCalled();
    expect(routerSpy).not.toHaveBeenCalled();

    expect(localStorage.length).toBe(0);
    expect(localStorage.getItem('username')).toBeNull();
    expect(component.loginError).toBe('Could not find user with the specified credentials');
  });

  it('should navigateByUrl to sign up page when clicked sign up button', () => {
    const routerSpy = router.navigateByUrl.and.returnValue(Promise.resolve());

    component.onSignUp();

    expect(routerSpy).toHaveBeenCalledWith('/signUp');
  });
});
