import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Type} from '@angular/core';
import {IUserProfile} from '../Interfaces/IUserProfile';
import {IUser} from '../Interfaces/IUser';

describe('UserService', () => {
  let userService: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [ UserService ]
  }));

  beforeEach(() => {
    userService = TestBed.inject(UserService as Type<UserService>);
    httpTestingController = TestBed.inject(HttpTestingController as Type<HttpTestingController>);
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should send a successful request to create a user', () => {
    userService.createUser({ username: 'username', password: 'password' } as IUser)
      .subscribe(response => expect(response).toEqual('OK'), () => fail('Should have succeeded!'));

    const request = httpTestingController.expectOne('http://localhost:8080/createUser');
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual({ username: 'username', password: 'password' } as IUser);
    expect(request.request.url).toEqual('http://localhost:8080/createUser');

    request.flush('OK');
  });

  it('should send an unsuccessful request to create a user', () => {
    userService.createUser({ username: 'username', password: 'password' } as IUser)
      .subscribe(() => fail('Should have failed'), error => expect(error.error).toEqual('error'));

    const request = httpTestingController.expectOne('http://localhost:8080/createUser');
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual({ username: 'username', password: 'password' } as IUser);
    expect(request.request.url).toEqual('http://localhost:8080/createUser');

    request.flush('error', { status: 401, statusText: 'error' });
  });

  it('should send a successful request to get a user profile', () => {
    userService.getUserProfile('username')
               .subscribe(response => expect(response).toEqual({} as IUserProfile), () => fail('Should have been successful'));

    const request = httpTestingController.expectOne('http://localhost:8080/username/getUserProfile');
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual('http://localhost:8080/username/getUserProfile');

    request.flush({} as IUserProfile);
  });

  it('should send an unsuccessful request to get a user profile', () => {
    userService.getUserProfile('username')
               .subscribe(() => fail('Should have failed'), error => expect(error.error).toEqual('error'));

    const request = httpTestingController.expectOne('http://localhost:8080/username/getUserProfile');
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual('http://localhost:8080/username/getUserProfile');

    request.flush('error', { status: 401, statusText: 'error' });
  });

  it('should send a successful request to update user password', () => {
    userService.updateUserPassword('username', 'password')
               .subscribe(response => expect(response).toEqual('OK'), () => fail('Should have been successful'));

    const request = httpTestingController.expectOne('http://localhost:8080/username/updatePassword');
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual('password');
    expect(request.request.url).toEqual('http://localhost:8080/username/updatePassword');

    request.flush('OK');
  });

  it('should send an unsuccessful request to update user password', () => {
    userService.updateUserPassword('username', 'password')
               .subscribe(() => fail('Should have failed'), error => expect(error.error).toEqual('error'));

    const request = httpTestingController.expectOne('http://localhost:8080/username/updatePassword');
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual('password');
    expect(request.request.url).toEqual('http://localhost:8080/username/updatePassword');

    request.flush('error', { status: 401, statusText: 'error' });
  });

  it('should send a successful request to update user email', () => {
    userService.updateUserEmail('username', 'email')
               .subscribe(response => expect(response).toEqual('OK'), () => fail('Should have been successful'));

    const request = httpTestingController.expectOne('http://localhost:8080/username/updateEmail');
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual('email');
    expect(request.request.url).toEqual('http://localhost:8080/username/updateEmail');

    request.flush('OK');
  });

  it('should send an unsuccessful request to update user password', () => {
    userService.updateUserEmail('username', 'email')
               .subscribe(() => fail('Should have failed'), error => expect(error.error).toEqual('error'));

    const request = httpTestingController.expectOne('http://localhost:8080/username/updateEmail');
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual('email');
    expect(request.request.url).toEqual('http://localhost:8080/username/updateEmail');

    request.flush('error', { status: 401, statusText: 'error' });
  });

  it('should send a successful request to update user profile', () => {
    userService.updateUserProfile('username', {} as IUserProfile)
               .subscribe(response => expect(response).toEqual('OK'), () => fail('Should have been successful'));

    const request = httpTestingController.expectOne('http://localhost:8080/username/updateProfile');
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual({});
    expect(request.request.url).toEqual('http://localhost:8080/username/updateProfile');

    request.flush('OK');
  });

  it('should send an unsuccessful request to update user profile', () => {
    userService.updateUserProfile('username', {} as IUserProfile)
               .subscribe(() => fail('Should have failed'), error => expect(error.error).toEqual('error'));

    const request = httpTestingController.expectOne('http://localhost:8080/username/updateProfile');
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual({});
    expect(request.request.url).toEqual('http://localhost:8080/username/updateProfile');

    request.flush('error', { status: 401, statusText: 'error' });
  });
});
