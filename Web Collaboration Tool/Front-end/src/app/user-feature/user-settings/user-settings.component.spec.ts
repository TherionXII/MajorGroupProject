import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSettingsComponent } from './user-settings.component';
import {UserFeatureModule} from '../user-feature.module';
import {UserService} from '../Services/user.service';
import {IUserProfile} from '../Interfaces/IUserProfile';
import {of, throwError} from 'rxjs';

describe('UserSettingsComponent', () => {
  let component: UserSettingsComponent;
  let fixture: ComponentFixture<UserSettingsComponent>;

  const userService = jasmine.createSpyObj('UserService', [ 'getUserProfile', 'updateUserPassword',
                                                                                    'updateUserEmail', 'updateUserProfile' ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ UserFeatureModule ],
      providers: [ { provide: UserService, useValue: userService } ]
    })
    .compileComponents();
  }));

  beforeEach( () => {
    let store = {};

    spyOn(localStorage, 'getItem').and.callFake((key) => store[key]);
    spyOn(localStorage, 'setItem').and.callFake( (key, value) => store[key] = value + '');
    spyOn(localStorage, 'clear').and.callFake(() => store = {});

    localStorage.setItem('username', 'username');
  });

  it('should create', () => {
    userService.getUserProfile.and.returnValue(of({} as IUserProfile));

    fixture = TestBed.createComponent(UserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should have a valid password form when all inputs are valid', () => {
    userService.getUserProfile.and.returnValue(of({} as IUserProfile));

    fixture = TestBed.createComponent(UserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.passwordSettingsForm.get('password').setValue('password');
    component.passwordSettingsForm.get('repeatPassword').setValue('password');

    expect(component.passwordSettingsForm.valid).toBeTrue();
  });

  it('should have an invalid password form when inputs are invalid', () => {
    userService.getUserProfile.and.returnValue(of({} as IUserProfile));

    fixture = TestBed.createComponent(UserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.passwordSettingsForm.get('password').setValue('');
    component.passwordSettingsForm.get('repeatPassword').setValue('passwor');

    expect(component.passwordSettingsForm.hasError('validatePassword')).toBeTrue();
    expect(component.passwordSettingsForm.valid).toBeFalse();
  });

  it('should have a valid email form when input is valid', () => {
    userService.getUserProfile.and.returnValue(of({} as IUserProfile));

    fixture = TestBed.createComponent(UserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.emailSettingsForm.get('email').setValue('email@email.com');

    expect(component.emailSettingsForm.valid).toBeTrue();
  });

  it('should have an invalid email form when input is invalid', () => {
    userService.getUserProfile.and.returnValue(of({} as IUserProfile));

    fixture = TestBed.createComponent(UserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.emailSettingsForm.get('email').setValue('email');

    expect(component.emailSettingsForm.valid).toBeFalse();
  });

  it('should always have a valid profile form as no validation is performed nor enforced', () => {
    userService.getUserProfile.and.returnValue(of({} as IUserProfile)); // values are patched as empty

    fixture = TestBed.createComponent(UserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.profileSettingsFormGroup.get('name').value).toEqual('');
    expect(component.profileSettingsFormGroup.get('surname').value).toEqual('');
    expect(component.profileSettingsFormGroup.get('gender').value).toEqual('');
    expect(component.profileSettingsFormGroup.get('institution').value).toEqual('');

    expect(component.profileSettingsFormGroup.valid).toBeTrue();
  });

  it('should retrieve user profile and patch profile form when initializing component', () => {
    const getUserProfileSpy = userService.getUserProfile.and.returnValue(of({ name: 'name', surname: 'surname' } as IUserProfile));

    fixture = TestBed.createComponent(UserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(getUserProfileSpy).toHaveBeenCalledWith('username');
    expect(component.profileSettingsFormGroup.get('name').value).toEqual('name');
    expect(component.profileSettingsFormGroup.get('surname').value).toEqual('surname');
    expect(component.profileSettingsFormGroup.get('gender').value).toEqual('');
    expect(component.profileSettingsFormGroup.get('institution').value).toEqual('');
  });

  it('should set an error message when failed to retrieve user\'s profile', () => {
    const getUserProfileSpy = userService.getUserProfile.and.returnValue(throwError({ message: 'error' }));

    fixture = TestBed.createComponent(UserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(getUserProfileSpy).toHaveBeenCalledWith('username');
    expect(component.resultMessage).toEqual('error');
  });

  it('should clear the error message when changing tabs', () => {
    userService.getUserProfile.and.returnValue(of({} as IUserProfile));

    fixture = TestBed.createComponent(UserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.resultMessage = 'message';
    component.onTabChange();

    expect(component.resultMessage).toEqual('');
  });

  it('should return true when password form is empty', () => {
    userService.getUserProfile.and.returnValue(of({} as IUserProfile));

    fixture = TestBed.createComponent(UserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.isUpdatePasswordButtonDisabled()).toBeTrue();
  });

  it('should return false when password form is not empty', () => {
    userService.getUserProfile.and.returnValue(of({} as IUserProfile));

    fixture = TestBed.createComponent(UserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.passwordSettingsForm.get('password').setValue('password');
    expect(component.isUpdatePasswordButtonDisabled()).toBeFalse();
  });

  it('should return true when email form is empty', () => {
    userService.getUserProfile.and.returnValue(of({} as IUserProfile));

    fixture = TestBed.createComponent(UserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.isUpdateEmailButtonDisabled()).toBeTrue();
  });

  it('should return true when email form is not empty', () => {
    userService.getUserProfile.and.returnValue(of({} as IUserProfile));

    fixture = TestBed.createComponent(UserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.emailSettingsForm.get('email').setValue('email@email.com');

    expect(component.isUpdateEmailButtonDisabled()).toBeFalse();
  });

  it('should return true when profile form is empty', () => {
    userService.getUserProfile.and.returnValue(of({} as IUserProfile)); // patched as empty values

    fixture = TestBed.createComponent(UserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.isUpdateProfileButtonDisabled()).toBeTrue();
  });

  it('should return false when profile form is not empty', () => {
    userService.getUserProfile.and.returnValue(of({ name: 'name' } as IUserProfile)); // patched name, rest is empty

    fixture = TestBed.createComponent(UserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.isUpdateProfileButtonDisabled()).toBeFalse();
  });

  it('should set result message to success message when updated password successfully', () => {
    userService.getUserProfile.and.returnValue(of({} as IUserProfile));
    const updateUserPasswordSpy = userService.updateUserPassword.and.returnValue(of('OK'));

    fixture = TestBed.createComponent(UserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.passwordSettingsForm.get('password').setValue('password');
    component.passwordSettingsForm.get('repeatPassword').setValue('password');
    component.onUpdatePassword();

    expect(updateUserPasswordSpy).toHaveBeenCalledWith('username', 'password');
    expect(component.resultMessage).toEqual('Password updated successfully!');
  });

  it('should set result message to error message when failed to update password', () => {
    userService.getUserProfile.and.returnValue(of({} as IUserProfile));
    const updateUserPasswordSpy = userService.updateUserPassword.and.returnValue(throwError({ message: 'error' }));

    fixture = TestBed.createComponent(UserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.passwordSettingsForm.get('password').setValue('password');
    component.passwordSettingsForm.get('repeatPassword').setValue('password');
    component.onUpdatePassword();

    expect(updateUserPasswordSpy).toHaveBeenCalledWith('username', 'password');
    expect(component.resultMessage).toEqual('error');
  });

  it('should set result message to success message when updated email successfully', () => {
    userService.getUserProfile.and.returnValue(of({} as IUserProfile));
    const updateUserEmailSpy = userService.updateUserEmail.and.returnValue(of('OK'));

    fixture = TestBed.createComponent(UserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.emailSettingsForm.get('email').setValue('email@email.com');
    component.onUpdateEmail();

    expect(updateUserEmailSpy).toHaveBeenCalledWith('username', 'email@email.com');
    expect(component.resultMessage).toEqual('Email updated successfully!');
  });

  it('should set result message to error message when failed to update password', () => {
    userService.getUserProfile.and.returnValue(of({} as IUserProfile));
    const updateUserEmailSpy = userService.updateUserEmail.and.returnValue(throwError({ message: 'error' }));

    fixture = TestBed.createComponent(UserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.emailSettingsForm.get('email').setValue('email@email.com');
    component.onUpdateEmail();

    expect(updateUserEmailSpy).toHaveBeenCalledWith('username', 'email@email.com');
    expect(component.resultMessage).toEqual('error');
  });

  it('should set result message to success message when updated email successfully', () => {
    userService.getUserProfile.and.returnValue(of({ name: 'name' } as IUserProfile)); // name patched as name, rest is empty
    const updateUserProfileSpy = userService.updateUserProfile.and.returnValue(of('OK'));

    fixture = TestBed.createComponent(UserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.onUpdateProfile();

    expect(updateUserProfileSpy).toHaveBeenCalledWith('username', component.profileSettingsFormGroup.getRawValue());
    expect(component.resultMessage).toEqual('Profile updated successfully!');
  });

  it('should set result message to error message when failed to update password', () => {
    userService.getUserProfile.and.returnValue(of({ name: 'name' } as IUserProfile)); // name patched as name, rest is empty
    const updateUserProfileSpy = userService.updateUserProfile.and.returnValue(throwError({ message: 'error' }));

    fixture = TestBed.createComponent(UserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.onUpdateProfile();

    expect(updateUserProfileSpy).toHaveBeenCalledWith('username', component.profileSettingsFormGroup.getRawValue());
    expect(component.resultMessage).toEqual('error');
  });
});
