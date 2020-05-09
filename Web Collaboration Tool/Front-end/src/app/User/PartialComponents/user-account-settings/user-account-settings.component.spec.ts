import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountSettingsComponent } from './user-account-settings.component';
import {UserModule} from '../../user.module';
import {UserService} from '../../Services/user.service';
import {of, throwError} from 'rxjs';

describe('UserAccountSettingsComponent', () => {
  let component: UserAccountSettingsComponent;
  let fixture: ComponentFixture<UserAccountSettingsComponent>;

  const userService = jasmine.createSpyObj('UserService', [ 'updateUserPassword', 'updateUserEmail' ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAccountSettingsComponent ],
      imports: [ UserModule ],
      providers: [ { provide: UserService, useValue: userService } ]
    })
    .compileComponents();
  }));

  beforeEach(() => spyOn(localStorage, 'getItem').and.returnValue('username'));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true when password form is empty', () => {
    expect(component.isUpdatePasswordButtonDisabled()).toBeTrue();
  });

  it('should return false when password form is not empty', () => {
    component.passwordSettingsForm.get('password').setValue('password');
    expect(component.isUpdatePasswordButtonDisabled()).toBeFalse();
  });

  it('should return true when email form is empty', () => {
    expect(component.isUpdateEmailButtonDisabled()).toBeTrue();
  });

  it('should return false when email form is not empty', () => {
    component.emailSettingsForm.get('email').setValue('email@email.com');
    expect(component.isUpdateEmailButtonDisabled()).toBeFalse();
  });

  it('should set result message to success message when updated password successfully', () => {
    userService.updateUserPassword.and.returnValue(of('OK'));

    component.passwordSettingsForm.get('password').setValue('password');
    component.passwordSettingsForm.get('repeatPassword').setValue('password');
    component.onUpdatePassword();

    expect(userService.updateUserPassword).toHaveBeenCalledWith('username', 'password');
    expect(component.resultMessage).toEqual('Password updated successfully!');
  });

  it('should set result message to error message when failed to update password', () => {
    userService.updateUserPassword.and.returnValue(throwError({ message: 'error' }));

    component.passwordSettingsForm.get('password').setValue('password');
    component.passwordSettingsForm.get('repeatPassword').setValue('password');
    component.onUpdatePassword();

    expect(userService.updateUserPassword).toHaveBeenCalledWith('username', 'password');
    expect(component.resultMessage).toEqual('error');
  });

  it('should set result message to success message when updated email successfully', () => {
    userService.updateUserEmail.and.returnValue(of('OK'));

    component.emailSettingsForm.get('email').setValue('email@email.com');
    component.onUpdateEmail();

    expect(userService.updateUserEmail).toHaveBeenCalledWith('username', 'email@email.com');
    expect(component.resultMessage).toEqual('Email updated successfully!');
  });

  it('should set result message to error message when failed to update password', () => {
    userService.updateUserEmail.and.returnValue(throwError({ message: 'error' }));

    component.emailSettingsForm.get('email').setValue('email@email.com');
    component.onUpdateEmail();

    expect(userService.updateUserEmail).toHaveBeenCalledWith('username', 'email@email.com');
    expect(component.resultMessage).toEqual('error');
  });
});
