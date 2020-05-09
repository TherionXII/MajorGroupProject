import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileSettingsComponent } from './user-profile-settings.component';
import {UserModule} from '../../user.module';
import {UserService} from '../../Services/user.service';
import {of, throwError} from 'rxjs';
import {IUserProfile} from '../../Interfaces/IUserProfile';
import {ActivatedRoute} from '@angular/router';

describe('UserProfileSettingsComponent', () => {
  let component: UserProfileSettingsComponent;
  let fixture: ComponentFixture<UserProfileSettingsComponent>;

  const userService = jasmine.createSpyObj('UserService', [ 'updateUserProfile' ]);

  describe('testing when route resolved successfully', () => {
    const activatedRouteStub = { data: of({ userProfile: { name: 'name', surname: 'surname' } as IUserProfile }) };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ UserProfileSettingsComponent ],
        imports: [ UserModule ],
        providers: [
          { provide: UserService, useValue: userService },
          { provide: ActivatedRoute, useValue: activatedRouteStub }
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => spyOn(localStorage, 'getItem').and.returnValue('username'));

    beforeEach(() => {
      fixture = TestBed.createComponent(UserProfileSettingsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize fields successfully and patch profile form when initializing component', () => {
      expect(component.resultMessage).toEqual('');
      expect(component.profileSettingsFormGroup.get('name').value).toEqual('name');
      expect(component.profileSettingsFormGroup.get('surname').value).toEqual('surname');
      expect(component.profileSettingsFormGroup.get('gender').value).toEqual('');
      expect(component.profileSettingsFormGroup.get('institution').value).toEqual('');
    });

    it('should return true when profile form is empty', () => {
      component.profileSettingsFormGroup.patchValue({ name: '', surname: '' } as IUserProfile);

      expect(component.isUpdateProfileButtonDisabled()).toBeTrue();
    });

    it('should return false when profile form is not empty', () => {
      expect(component.isUpdateProfileButtonDisabled()).toBeFalse();
    });

    it('should set result message to success message when updated user profile successfully', () => {
      userService.updateUserProfile.and.returnValue(of('OK'));

      component.onUpdateProfile();

      expect(userService.updateUserProfile).toHaveBeenCalledWith('username', component.profileSettingsFormGroup.getRawValue());
      expect(component.resultMessage).toEqual('Profile updated successfully!');
    });

    it('should set result message to error message when failed to update password', () => {
      userService.updateUserProfile.and.returnValue(throwError({ message: 'error' }));

      component.onUpdateProfile();

      expect(userService.updateUserProfile).toHaveBeenCalledWith('username', component.profileSettingsFormGroup.getRawValue());
      expect(component.resultMessage).toEqual('error');
    });
  });

  describe(' testing when route failed to resolve', () => {
    const activatedRouteStub = { data: throwError('Error') };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ UserProfileSettingsComponent ],
        imports: [ UserModule ],
        providers: [
          { provide: UserService, useValue: userService },
          { provide: ActivatedRoute, useValue: activatedRouteStub }
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => spyOn(localStorage, 'getItem').and.returnValue('username'));

    beforeEach(() => {
      fixture = TestBed.createComponent(UserProfileSettingsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should set error message when route failed to resolve', () => {
      expect(component.resultMessage).toEqual('Error');
      expect(component.profileSettingsFormGroup.get('name').value).toEqual('');
      expect(component.profileSettingsFormGroup.get('surname').value).toEqual('');
      expect(component.profileSettingsFormGroup.get('gender').value).toEqual('');
      expect(component.profileSettingsFormGroup.get('institution').value).toEqual('');
    });
  });
});
