import { TestBed } from '@angular/core/testing';

import { UserProfileResolverService } from './user-profile-resolver.service';
import {RouterTestingModule} from '@angular/router/testing';
import {UserService} from '../Services/user.service';
import {of, throwError} from 'rxjs';
import {IUserProfile} from '../Interfaces/IUserProfile';
import {ActivatedRoute, Router} from '@angular/router';

fdescribe('UserProfileResolverService', () => {
  let service: UserProfileResolverService;

  const userServiceStub = jasmine.createSpyObj('UserService', [ 'getUserProfile' ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [ { provide: UserService, useValue: userServiceStub }]
    });
    service = TestBed.inject(UserProfileResolverService);
  });

  beforeEach(() => spyOn(localStorage, 'getItem').and.returnValue('username'));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user profile when successful', () => {
    userServiceStub.getUserProfile.and.returnValue(of({ name: 'name' } as IUserProfile));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(userProfile => {
        expect(userServiceStub.getUserProfile).toHaveBeenCalledWith('username');

        expect(userProfile.name).toEqual('name');
      }, () => fail('Should have succeeded!'));
  });

  it('should return an error message when failed', () => {
    userServiceStub.getUserProfile.and.returnValue(throwError('Error'));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(() => fail('Should have failed!'), error => {
        expect(userServiceStub.getUserProfile).toHaveBeenCalledWith('username');

        expect(error).toEqual('Failed to retrieve user data; please try again later');
      });
  })
});
