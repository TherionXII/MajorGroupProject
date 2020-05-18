import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpResponse} from '@angular/common/http';
import {INotification} from '../Interfaces/INotification';

describe('NotificationService', () => {
  let service: NotificationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ NotificationService ]
    });
    service = TestBed.inject(NotificationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sent a successful request to determine if collaboration request has been sent', () => {
    service.hasSentCollaborationRequest('user1', 'user2')
      .subscribe(response => expect(response).toBeTrue(), () => fail('Should have succeeded!'));

    const request = httpTestingController.expectOne('http://localhost:8080/api/privateRequests/user1/user2/hasSentRequest');
    expect(request.request.url).toEqual('http://localhost:8080/api/privateRequests/user1/user2/hasSentRequest');
    expect(request.request.method).toEqual('GET');

    request.event(new HttpResponse<boolean>({ body: true }));
  });

  it('should sent an unsuccessful request to determine if collaboration request has been sent', () => {
    service.hasSentCollaborationRequest('user1', 'user2')
      .subscribe(() => fail('Should have failed!'), error => expect(error.error).toEqual('Error'));

    const request = httpTestingController.expectOne('http://localhost:8080/api/privateRequests/user1/user2/hasSentRequest');
    expect(request.request.url).toEqual('http://localhost:8080/api/privateRequests/user1/user2/hasSentRequest');
    expect(request.request.method).toEqual('GET');

    request.flush('Error', { status: 401, statusText: 'Error' });
  });

  it('should sent a successful request to determine if collaboration request has been received', () => {
    service.hasReceivedCollaborationRequest('user1', 'user2')
      .subscribe(response => expect(response).toBeTrue(), () => fail('Should have succeeded!'));

    const request = httpTestingController.expectOne('http://localhost:8080/api/privateRequests/user2/user1/hasReceivedRequest');
    expect(request.request.url).toEqual('http://localhost:8080/api/privateRequests/user2/user1/hasReceivedRequest');
    expect(request.request.method).toEqual('GET');

    request.event(new HttpResponse<boolean>({ body: true }));
  });

  it('should sent an unsuccessful request to determine if collaboration request has been received', () => {
    service.hasReceivedCollaborationRequest('user1', 'user2')
      .subscribe(() => fail('Should have failed!'), error => expect(error.error).toEqual('Error'));

    const request = httpTestingController.expectOne('http://localhost:8080/api/privateRequests/user2/user1/hasReceivedRequest');
    expect(request.request.url).toEqual('http://localhost:8080/api/privateRequests/user2/user1/hasReceivedRequest');
    expect(request.request.method).toEqual('GET');

    request.flush('Error', { status: 401, statusText: 'Error' });
  });

  it('should sent a successful request to retrieve notifications for user', () => {
    service.getAllNotificationsForUser('username')
      .subscribe(response => expect(response.length).toEqual(1), () => fail('Should have succeeded!'));

    const request = httpTestingController.expectOne('http://localhost:8080/api/notification/username/getNotifications');
    expect(request.request.url).toEqual('http://localhost:8080/api/notification/username/getNotifications');
    expect(request.request.method).toEqual('GET');

    request.flush([ {} as INotification ]);
  });

  it('should sent an unsuccessful request to retrieve notifications for user', () => {
    service.getAllNotificationsForUser('username')
      .subscribe(() => fail('Should have failed!'), error => expect(error.error).toEqual('Error'));

    const request = httpTestingController.expectOne('http://localhost:8080/api/notification/username/getNotifications');
    expect(request.request.url).toEqual('http://localhost:8080/api/notification/username/getNotifications');
    expect(request.request.method).toEqual('GET');

    request.flush('Error', { status: 401, statusText: 'Error' });
  });
});
