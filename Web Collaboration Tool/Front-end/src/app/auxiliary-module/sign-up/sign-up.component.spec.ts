import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import {AuxiliaryModule} from '../auxiliary.module';
import {SignUpService} from '../services/sign-up.service';
import {UserService} from '../../user-feature/Services/user.service';
import {Router} from '@angular/router';
import {of, throwError} from 'rxjs';
import {IUser} from '../../user-feature/Interfaces/IUser';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  const signUpService = jasmine.createSpyObj('SignUpService', [ 'createUser' ]);
  const userService = jasmine.createSpyObj('UserService', [ 'updateUserProfile' ]);
  const router = jasmine.createSpyObj('Router', [ 'navigateByUrl' ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AuxiliaryModule ],
      providers: [
        { provide: SignUpService, useValue: signUpService },
        { provide: UserService, useValue: userService },
        { provide: Router, useValue: router }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
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
    signUpService.createUser.calls.reset();
    userService.updateUserProfile.calls.reset();
    router.navigateByUrl.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when all inputs are valid', () => {
    component.signUpFormRequiredData.get('username').setValue('username');
    component.signUpFormRequiredData.get('password').setValue('password');
    component.signUpFormRequiredData.get('repeatPassword').setValue('password');
    component.signUpFormRequiredData.get('email').setValue('email@email.com');

    fixture.detectChanges();
    expect(component.signUpFormRequiredData.valid).toBeTrue();
  });

  it('should have an invalid form when inputs are invalid', () => {
    component.signUpFormRequiredData.get('username').setValue('');

    expect(component.signUpFormRequiredData.valid).toBeFalse();

    component.signUpFormRequiredData.get('username').setValue('username');
    component.signUpFormRequiredData.get('password').setValue('pa');

    expect(component.signUpFormRequiredData.valid).toBeFalse();

    component.signUpFormRequiredData.get('password').setValue('password');
    component.signUpFormRequiredData.get('repeatPassword').setValue('passwor');

    expect(component.signUpFormRequiredData.valid).toBeFalse();

    component.signUpFormRequiredData.get('repeatPassword').setValue('password1');

    expect(component.signUpFormRequiredData.valid).toBeFalse();

    component.signUpFormRequiredData.get('repeatPassword').setValue('password');
    component.signUpFormRequiredData.get('email').setValue('email');

    expect(component.signUpFormRequiredData.valid).toBeFalse();
  });

  it('should enable second part of the sign up form when created user successfully', () => {
    component.signUpFormRequiredData.get('username').setValue('username');
    component.signUpFormRequiredData.get('password').setValue('password');
    component.signUpFormRequiredData.get('repeatPassword').setValue('password');
    component.signUpFormRequiredData.get('email').setValue('email@email.com');

    const createUserSpy = signUpService.createUser.and.returnValue(of('Ok'));
    component.onRequiredDataSubmit();

    expect(createUserSpy).toHaveBeenCalledWith(component.signUpFormRequiredData.getRawValue() as IUser);
    expect(component.isInOptionalPart).toBeTrue();
  });

  it('should set an error message when failed to create a user', () => {
    component.signUpFormRequiredData.get('username').setValue('username');
    component.signUpFormRequiredData.get('password').setValue('password');
    component.signUpFormRequiredData.get('repeatPassword').setValue('password');
    component.signUpFormRequiredData.get('email').setValue('email@email.com');

    const createUserSpy = signUpService.createUser.and.returnValue(throwError({ error: 'error' }));
    component.onRequiredDataSubmit();

    expect(createUserSpy).toHaveBeenCalledWith(component.signUpFormRequiredData.getRawValue() as IUser);
    expect(component.signUpError).toEqual('error');
    expect(component.isInOptionalPart).toBeFalse();
  });

  it('should have a valid optional data form', () => {
    expect(component.signUpFormOptionalData.valid).toBeTrue();

    component.signUpFormOptionalData.get('name').setValue('name');
    component.signUpFormOptionalData.get('surname').setValue('surname');
    component.signUpFormOptionalData.get('gender').setValue('gender');
    component.signUpFormOptionalData.get('institution').setValue('institution');

    expect(component.signUpFormOptionalData.valid).toBeTrue();
  });

  it('should set local storage to username and redirect to user page when created profile successfully', fakeAsync(() => {
    component.signUpFormOptionalData.get('name').setValue('name');
    component.signUpFormOptionalData.get('surname').setValue('surname');
    component.signUpFormOptionalData.get('gender').setValue('gender');
    component.signUpFormOptionalData.get('institution').setValue('institution');

    component.signUpFormRequiredData.get('username').setValue('username');

    const updateUserProfileSpy = userService.updateUserProfile.and.returnValue(of('OK'));
    const navigateByUrlSpy = router.navigateByUrl.and.returnValue(Promise.resolve());

    component.onOptionalDataSubmit();
    tick();

    expect(updateUserProfileSpy).toHaveBeenCalledWith('username', component.signUpFormOptionalData.getRawValue());
    expect(localStorage.getItem('username')).toEqual('username');
    expect(navigateByUrlSpy).toHaveBeenCalledWith('/user/username');
  }));

  it('should set an error message when failed to create user profile', fakeAsync(() => {
    component.signUpFormOptionalData.get('name').setValue('name');
    component.signUpFormOptionalData.get('surname').setValue('surname');
    component.signUpFormOptionalData.get('gender').setValue('gender');
    component.signUpFormOptionalData.get('institution').setValue('institution');

    component.signUpFormRequiredData.get('username').setValue('username');

    const updateUserProfileSpy = userService.updateUserProfile.and.returnValue(throwError({ error: 'error' }));
    const navigateByUrlSpy = router.navigateByUrl;

    component.onOptionalDataSubmit();
    tick();

    expect(updateUserProfileSpy).toHaveBeenCalledWith('username', component.signUpFormOptionalData.getRawValue());
    expect(localStorage.getItem('username')).toBeNull();
    expect(navigateByUrlSpy).not.toHaveBeenCalled();
    expect(component.signUpError).toEqual('error');
  }));
});
