import { TestBed } from '@angular/core/testing';

import { ChatResolverService } from './chat-resolver.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ThreadService} from '../../Services/thread.service';
import {ActivatedRoute, Router} from '@angular/router';
import {of, throwError} from 'rxjs';
import {IMessage} from '../../Interfaces/IMessage';

describe('PrivateCollaborationChatResolverService', () => {
  let service: ChatResolverService;

  const threadServiceStub = jasmine.createSpyObj('ThreadService', [ 'getMessagesForThread' ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [ { provide: ThreadService, useValue: threadServiceStub }]
    });
    service = TestBed.inject(ChatResolverService);
  });

  beforeEach(() => spyOn(TestBed.inject(ActivatedRoute).snapshot.paramMap, 'get').and.returnValue('0'));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of messages and web socket channels', () => {
    threadServiceStub.getMessagesForThread.and.returnValue(of([ {} as IMessage, {} as IMessage ]));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(chatData => {
        expect(threadServiceStub.getMessagesForThread).toHaveBeenCalledWith('0');

        expect(chatData[0].length).toEqual(2);
        expect(chatData[1]).toEqual('/topic/user/collaboration/chat/0');
        expect(chatData[2]).toEqual('/app/user/collaboration/chat/0');
      }, () => fail('Should have succeeded!'));
  });

  it('should return an error when failed to retrieve messages', () => {
    threadServiceStub.getMessagesForThread.and.returnValue(throwError('Error'));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(() => fail('Should have failed'), error => {
        expect(threadServiceStub.getMessagesForThread).toHaveBeenCalledWith('0');

        expect(error).toEqual('Failed to retrieve chat data; please try again later');
      });
  });
});
