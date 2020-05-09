import { async, ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';

import { of, throwError } from 'rxjs';

import {UtilityModule} from '../../utility.module';

import { HomePageComponent } from './home-page.component';

import { LoginService } from '../../Services/login.service';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  const loginService = jasmine.createSpyObj('LoginService', [ 'login' ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        UtilityModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: LoginService, useValue: loginService }
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigateByUrl to user page on successful login and add username to session', () => {
    component.loginForm.get('username').setValue('username');
    component.loginForm.get('password').setValue('password');

    loginService.login.and.returnValue(of('Ok'));
    const routerSpy = spyOn(TestBed.inject(Router), 'navigateByUrl');

    component.onSubmit();

    expect(localStorage.getItem('username')).toBe('username');
    expect(component.loginError).toEqual('');

    expect(loginService.login).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith('/user/' + localStorage.getItem('username'));
  });

  it('should set login error when login is unsuccessful', () => {
    component.loginForm.get('username').setValue('username');
    component.loginForm.get('password').setValue('password');

    loginService.login.and.returnValue(throwError({ error: 'Could not find user with the specified credentials'}));
    const routerSpy = spyOn(TestBed.inject(Router), 'navigateByUrl');
    component.onSubmit();

    expect(loginService.login).toHaveBeenCalled();
    expect(routerSpy).not.toHaveBeenCalled();

    expect(localStorage.length).toBe(0);
    expect(localStorage.getItem('username')).toBeUndefined();
    expect(component.loginError).toBe('Could not find user with the specified credentials');
  });

  it('should navigateByUrl to sign up page when clicked sign up button', () => {
    const routerSpy = spyOn(TestBed.inject(Router), 'navigateByUrl');

    component.onSignUp();

    expect(routerSpy).toHaveBeenCalledWith('/signUp');
  });
});
