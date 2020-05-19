import { TestBed } from '@angular/core/testing';

import { PrivateCollaborationService } from './private-collaboration.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpResponse} from '@angular/common/http';
import {IPrivateCollaboration} from '../Interfaces/IPrivateCollaboration';
import {IPrivateCollaborationRequest} from '../../Utility/Interfaces/IPrivateCollaborationRequest';

describe('PrivateCollaborationService', () => {
  let service: PrivateCollaborationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(PrivateCollaborationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a successful request to inquire whether users collaborate', () => {
    service.isCollaborating('user1', 'user2')
      .subscribe(isCollaborating => expect(isCollaborating).toBeTrue(), () => fail('Should have succeeded!'));

    const request = httpTestingController.expectOne('http://localhost:8080/api/privateCollaboration/user1/user2/isCollaborating');
    expect(request.request.url).toEqual('http://localhost:8080/api/privateCollaboration/user1/user2/isCollaborating');
    expect(request.request.method).toEqual('GET');

    request.event(new HttpResponse<boolean>({ body: true }));
  });

  it('should send an unsuccessful request to inquire whether users collaborate', () => {
    service.isCollaborating('user1', 'user2')
      .subscribe(() => fail('Should have failed!'), error => expect(error.error).toEqual('Error'));

    const request = httpTestingController.expectOne('http://localhost:8080/api/privateCollaboration/user1/user2/isCollaborating');
    expect(request.request.url).toEqual('http://localhost:8080/api/privateCollaboration/user1/user2/isCollaborating');
    expect(request.request.method).toEqual('GET');

    request.flush('Error', { status: 401, statusText: 'Error' });
  });

  it('should send a successful request to get private collaborations for user', () => {
    service.getPrivateCollaborationsForUser('user')
      .subscribe(collaborations => expect(collaborations.length).toEqual(1), () => fail('Should have succeeded!'));

    const request = httpTestingController.expectOne('http://localhost:8080/api/privateCollaboration/user/privateCollaborations');
    expect(request.request.url).toEqual('http://localhost:8080/api/privateCollaboration/user/privateCollaborations');
    expect(request.request.method).toEqual('GET');

    request.flush([ {} as IPrivateCollaboration ])
  });

  it('should send an unsuccessful request to get private collaborations for user', () => {
    service.getPrivateCollaborationsForUser('user')
      .subscribe(() => fail('Should have failed!'), error => expect(error.error).toEqual('Error'));

    const request = httpTestingController.expectOne('http://localhost:8080/api/privateCollaboration/user/privateCollaborations');
    expect(request.request.url).toEqual('http://localhost:8080/api/privateCollaboration/user/privateCollaborations');
    expect(request.request.method).toEqual('GET');

    request.flush('Error', { status: 401, statusText: 'Error' });
  });

  it('should send a successful request to get private collaborations requests for user', () => {
    service.getPrivateCollaborationRequestsForUser('user')
      .subscribe(collaborations => expect(collaborations.length).toEqual(1), () => fail('Should have succeeded!'));

    const request = httpTestingController.expectOne('http://localhost:8080/api/privateRequests/user/getPrivateCollaborationRequests');
    expect(request.request.url).toEqual('http://localhost:8080/api/privateRequests/user/getPrivateCollaborationRequests');
    expect(request.request.method).toEqual('GET');

    request.flush([ {} as IPrivateCollaborationRequest ])
  });

  it('should send an unsuccessful request to get private collaborations requests for user', () => {
    service.getPrivateCollaborationRequestsForUser('user')
      .subscribe(() => fail('Should have failed!'), error => expect(error.error).toEqual('Error'));

    const request = httpTestingController.expectOne('http://localhost:8080/api/privateRequests/user/getPrivateCollaborationRequests');
    expect(request.request.url).toEqual('http://localhost:8080/api/privateRequests/user/getPrivateCollaborationRequests');
    expect(request.request.method).toEqual('GET');

    request.flush('Error', { status: 401, statusText: 'Error' });
  });
});
