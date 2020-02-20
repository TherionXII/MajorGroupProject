import {TestBed} from '@angular/core/testing';

import {ProfileResolverService} from './profile-resolver.service';
import {RouterTestingModule} from '@angular/router/testing';
import {UserService} from '../../user-feature/Services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {of} from 'rxjs';
import {IUserProfile} from '../../user-feature/Interfaces/IUserProfile';
import {Type} from '@angular/core';

describe('ProfileResolverService', () => {
  let service: ProfileResolverService;

  const userService = jasmine.createSpyObj('UserService', [ 'getUserProfile' ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]) ],
      providers: [ { provide: UserService, useValue: userService } ]
    });
    service = TestBed.inject(ProfileResolverService);
  });

  beforeEach( () => {
    let store = {};

    spyOn(localStorage, 'getItem').and.callFake((key) => store[key]);
    spyOn(localStorage, 'setItem').and.callFake( (key, value) => store[key] = value + '');
    spyOn(localStorage, 'clear').and.callFake(() => store = {});
  });

  beforeEach(() => {
    spyOn(TestBed.inject(ActivatedRoute as Type<ActivatedRoute>).snapshot.paramMap, 'get').and.returnValue('username');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return profile after successful API call', () => {
    const getUserProfileSpy = userService.getUserProfile.and.returnValue(of({ name: 'name' } as IUserProfile));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
           .subscribe((profile: IUserProfile) => {
             expect(getUserProfileSpy).toHaveBeenCalled();
             expect(profile.name).toEqual('name');
           }, () => fail('Should have succeeded!'));
  });

  it('should return to the user page when username in local storage is different from the username in url', () => {
    localStorage.setItem('username', 'user');

    userService.getUserProfile.and.returnValue(of(undefined));
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot).subscribe();

    expect(navigateSpy).toHaveBeenCalledWith([ `/user/${localStorage.getItem('username')}`]);
  });

  it('should return to the home page when user in local storage is same as the username in url', () => {
    localStorage.setItem('username', 'username');

    userService.getUserProfile.and.returnValue(of(undefined));
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot).subscribe();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});
