import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { IUser } from '../../user-feature/Interfaces/IUser';

import { SignUpService } from './sign-up.service';
import {Type} from '@angular/core';

describe('SignUpService', () => {
  let signUpService: SignUpService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [ SignUpService ]
  }));

  beforeEach(() => {
    signUpService = TestBed.inject(SignUpService as Type<SignUpService>);
    httpTestingController = TestBed.inject(HttpTestingController as Type<HttpTestingController>);
  });

  afterEach(() => httpTestingController.verify());

  it('should be created', () => {
    expect(signUpService).toBeTruthy();
  });

    let user: IUser;

    beforeEach(() => {
      user = {
        username: 'username',
        password: 'password',
        email: 'email@email.com'
      };
    });

  it('should send a successful request to create a user', () => {
    signUpService.createUser(user)
                 .subscribe(response => expect(response).toEqual('OK'),
                            () => fail('Should not have failed'));

    const request = httpTestingController.expectOne('http://localhost:8080/createUser');
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual(user);
    expect(request.request.url).toEqual('http://localhost:8080/createUser');

    request.flush('OK');
  });

  it('should send an unsuccessful request to create a user', () => {
    signUpService.createUser(user)
                 .subscribe(() => fail('Should not have succeeded'),
                            error => expect(error.error).toEqual('error'));

    const request = httpTestingController.expectOne('http://localhost:8080/createUser');
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual(user);
    expect(request.request.url).toEqual('http://localhost:8080/createUser');

    request.flush('error', { status: 401, statusText: 'error' });
  });
});
