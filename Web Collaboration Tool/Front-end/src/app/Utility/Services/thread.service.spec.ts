import { TestBed } from '@angular/core/testing';

import { ThreadService } from './thread.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {INotification} from '../Interfaces/INotification';
import {IMessage} from '../Interfaces/IMessage';

describe('ThreadService', () => {
  let service: ThreadService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ThreadService ]
    });
    service = TestBed.inject(ThreadService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a successful request to create a thread', () => {
    service.createNewThread('user1', 'user2')
      .subscribe(response => expect(response).toEqual(0), () => fail('Should have succeeded!'));

    const request = httpTestingController.expectOne('http://localhost:8080/api/chatThreads/createPrivateThread/user1/user2');
    expect(request.request.url).toEqual('http://localhost:8080/api/chatThreads/createPrivateThread/user1/user2');
    expect(request.request.method).toEqual('GET');

    request.flush(0);
  });

  it('should send an unsuccessful request to create a thread', () => {
    service.createNewThread('user1', 'user2')
      .subscribe(() => fail('Should have failed!'), error => expect(error.error).toEqual('Error'));

    const request = httpTestingController.expectOne('http://localhost:8080/api/chatThreads/createPrivateThread/user1/user2');
    expect(request.request.url).toEqual('http://localhost:8080/api/chatThreads/createPrivateThread/user1/user2');
    expect(request.request.method).toEqual('GET');

    request.flush('Error', { status: 401, statusText: 'Error' });
  });

  it('should send a successful request to retrieve thread messages', () => {
    service.getMessagesForThread('0')
      .subscribe(response => expect(response.length).toEqual(1), () => fail('Should have succeeded!'));

    const request = httpTestingController.expectOne('http://localhost:8080/api/chatThreads/getMessagesForThread/0');
    expect(request.request.url).toEqual('http://localhost:8080/api/chatThreads/getMessagesForThread/0');
    expect(request.request.method).toEqual('GET');

    request.flush([ {} as IMessage ]);
  });

  it('should send an unsuccessful request to retrieve thread messages', () => {
    service.getMessagesForThread('0')
      .subscribe(() => fail('Should have failed!'), error => expect(error.error).toEqual('Error'));

    const request = httpTestingController.expectOne('http://localhost:8080/api/chatThreads/getMessagesForThread/0');
    expect(request.request.url).toEqual('http://localhost:8080/api/chatThreads/getMessagesForThread/0');
    expect(request.request.method).toEqual('GET');

    request.flush('Error', { status: 401, statusText: 'Error' });
  });
});
