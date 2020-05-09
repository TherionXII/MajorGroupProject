import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { OptionalSignUpComponent } from './optional-sign-up.component';
import {of, throwError} from 'rxjs';
import {UtilityModule} from '../../utility.module';
import {RouterTestingModule} from '@angular/router/testing';
import {UserService} from '../../../User/Services/user.service';
import {Router} from '@angular/router';

describe('OptionalSignUpComponent', () => {
  let component: OptionalSignUpComponent;
  let fixture: ComponentFixture<OptionalSignUpComponent>;

  const userServiceStub = jasmine.createSpyObj('UserService', [ 'updateUserProfile' ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionalSignUpComponent ],
      imports: [
        UtilityModule,
        RouterTestingModule
      ],
      providers: [ { provide: UserService, useValue: userServiceStub } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => spyOn(localStorage, 'getItem').and.returnValue('username'));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set local storage to username and redirect to user page when created profile successfully', () => {
    component.signUpFormOptionalData.get('name').setValue('name');
    component.signUpFormOptionalData.get('surname').setValue('surname');
    component.signUpFormOptionalData.get('gender').setValue('gender');
    component.signUpFormOptionalData.get('institution').setValue('institution');

    userServiceStub.updateUserProfile.and.returnValue(of('OK'));
    const navigateByUrlSpy = spyOn(TestBed.inject(Router), 'navigateByUrl');

    component.onOptionalDataSubmit();

    expect(userServiceStub.updateUserProfile).toHaveBeenCalledWith('username', component.signUpFormOptionalData.getRawValue());
    expect(localStorage.getItem('username')).toEqual('username');
    expect(navigateByUrlSpy).toHaveBeenCalledWith('/user/username');
  });

  it('should set an error message when failed to create user profile', () => {
    component.signUpFormOptionalData.get('name').setValue('name');
    component.signUpFormOptionalData.get('surname').setValue('surname');
    component.signUpFormOptionalData.get('gender').setValue('gender');
    component.signUpFormOptionalData.get('institution').setValue('institution');

    userServiceStub.updateUserProfile.and.returnValue(throwError({ error: 'error' }));
    const navigateByUrlSpy = spyOn(TestBed.inject(Router), 'navigateByUrl');

    component.onOptionalDataSubmit();

    expect(userServiceStub.updateUserProfile).toHaveBeenCalledWith('username', component.signUpFormOptionalData.getRawValue());
    expect(navigateByUrlSpy).not.toHaveBeenCalled();
    expect(component.signUpError).toEqual('error');
  });
});
