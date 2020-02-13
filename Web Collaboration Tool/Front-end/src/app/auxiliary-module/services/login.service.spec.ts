import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {IUser} from '../../user-feature/Interfaces/IUser';
import {Type} from '@angular/core';

describe('LoginService', () => {
  let service: LoginService;
  let httpTestingController: HttpTestingController;

  let mockUser: IUser;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [LoginService]
  }));

  beforeEach(() => {
    service = TestBed.inject(LoginService as Type<LoginService>);
    httpTestingController = TestBed.inject(HttpTestingController as Type<HttpTestingController>)
  });

  beforeEach(() => {
    mockUser = {
      username: 'username',
      password: 'password',
      email: null
    };
  });

  afterEach(() => httpTestingController.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a successful login request and return OK', () => {
    service.login(mockUser)
           .subscribe(response => expect(response).toEqual('OK'), () => fail('Should be no errors'));

    const request = httpTestingController.expectOne('http://localhost:8080/login');
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual(mockUser);
    expect(request.request.url).toEqual('http://localhost:8080/login');

    request.flush('OK');
  });

  it('should send an unsuccessful login request and return an error message', () => {
    service.login(mockUser)
           .subscribe(() => fail('Should not succeed'), error => expect(error.error).toEqual('error'));

    const request = httpTestingController.expectOne('http://localhost:8080/login');
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual(mockUser);
    expect(request.request.url).toEqual('http://localhost:8080/login');

    request.flush('error', { status: 401, statusText: 'error' });
  });
});
