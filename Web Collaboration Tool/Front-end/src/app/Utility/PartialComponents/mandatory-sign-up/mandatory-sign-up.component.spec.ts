import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MandatorySignUpComponent } from './mandatory-sign-up.component';
import {of, throwError} from 'rxjs';
import {IUser} from '../../../User/Interfaces/IUser';
import {UtilityModule} from '../../utility.module';
import {UserService} from '../../../User/Services/user.service';

describe('MandatorySignUpComponent', () => {
  let component: MandatorySignUpComponent;
  let fixture: ComponentFixture<MandatorySignUpComponent>;

  const userServiceStub = jasmine.createSpyObj('UserService', [ 'createUser' ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MandatorySignUpComponent ],
      imports: [ UtilityModule ],
      providers: [ { provide: UserService, useValue: userServiceStub } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MandatorySignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enable second part of the sign up form when created user successfully', () => {
    component.signUpFormRequiredData.get('username').setValue('username');
    component.signUpFormRequiredData.get('password').setValue('password');
    component.signUpFormRequiredData.get('repeatPassword').setValue('password');
    component.signUpFormRequiredData.get('email').setValue('email@email.com');

    userServiceStub.createUser.and.returnValue(of('Ok'));
    const emitSpy = spyOn(component.userCreatedEvent, 'emit');

    component.onRequiredDataSubmit();

    expect(userServiceStub.createUser).toHaveBeenCalledWith(component.signUpFormRequiredData.getRawValue() as IUser);
    expect(emitSpy).toHaveBeenCalledWith('username');
  });

  it('should set an error message when failed to create a user', () => {
    component.signUpFormRequiredData.get('username').setValue('username');
    component.signUpFormRequiredData.get('password').setValue('password');
    component.signUpFormRequiredData.get('repeatPassword').setValue('password');
    component.signUpFormRequiredData.get('email').setValue('email@email.com');

    userServiceStub.createUser.and.returnValue(throwError({ error: 'error' }));
    component.onRequiredDataSubmit();

    expect(userServiceStub.createUser).toHaveBeenCalledWith(component.signUpFormRequiredData.getRawValue() as IUser);
    expect(component.signUpError).toEqual('error');
  });
});
