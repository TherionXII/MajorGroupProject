import { TestBed } from '@angular/core/testing';

import { PrivateCollaborationStatusResolverService } from './private-collaboration-status-resolver.service';
import {RouterTestingModule} from '@angular/router/testing';
import {NotificationService} from '../../Utility/Services/notification.service';
import {PrivateCollaborationService} from '../../PrivateCollaboration/Services/private-collaboration.service';
import {of, throwError} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

describe('PrivateCollaborationStatusResolverService', () => {
  let service: PrivateCollaborationStatusResolverService;

  const notificationServiceStub = jasmine.createSpyObj('NotificationService', [ 'hasReceivedCollaborationRequest', 'hasSentCollaborationRequest' ]);
  const privateCollaborationServiceStub = jasmine.createSpyObj('PrivateCollaborationService', [ 'isCollaborating' ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [
        { provide: NotificationService, useValue: notificationServiceStub },
        { provide: PrivateCollaborationService, useValue: privateCollaborationServiceStub }
      ]
    });
    service = TestBed.inject(PrivateCollaborationStatusResolverService);
  });

  beforeEach(() => spyOn(localStorage, 'getItem').and.returnValue('username'));

  beforeEach(() => spyOn(TestBed.inject(ActivatedRoute).snapshot.paramMap, 'get').and.returnValue('otherUser'));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return boolean values indicating private collaboration status', () => {
    notificationServiceStub.hasSentCollaborationRequest.and.returnValue(of(false));
    notificationServiceStub.hasReceivedCollaborationRequest.and.returnValue(of(false));
    privateCollaborationServiceStub.isCollaborating.and.returnValue(of(false));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(data => {
        expect(notificationServiceStub.hasSentCollaborationRequest).toHaveBeenCalledWith('username', 'otherUser');
        expect(notificationServiceStub.hasReceivedCollaborationRequest).toHaveBeenCalledWith('username', 'otherUser');
        expect(privateCollaborationServiceStub.isCollaborating).toHaveBeenCalledWith('username', 'otherUser');

        expect(data[0]).toBeFalse();
        expect(data[1]).toBeFalse();
        expect(data[2]).toBeFalse();
      }, () => fail('Should have succeeded!'));
  });

  it('should return an error when hasSentCollaborationRequest call failed', () => {
    notificationServiceStub.hasSentCollaborationRequest.and.returnValue(throwError('Error'));
    notificationServiceStub.hasReceivedCollaborationRequest.and.returnValue(of(false));
    privateCollaborationServiceStub.isCollaborating.and.returnValue(of(false));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(() => fail('Should have failed!'), error => {
        expect(notificationServiceStub.hasSentCollaborationRequest).toHaveBeenCalledWith('username', 'otherUser');
        expect(notificationServiceStub.hasReceivedCollaborationRequest).toHaveBeenCalledWith('username', 'otherUser');
        expect(privateCollaborationServiceStub.isCollaborating).toHaveBeenCalledWith('username', 'otherUser');

        expect(error).toEqual('Failed to retrieve user data; please try again later');
      });
  });

  it('should return an error when hasReceivedCollaborationRequest call failed', () => {
    notificationServiceStub.hasSentCollaborationRequest.and.returnValue(of(false));
    notificationServiceStub.hasReceivedCollaborationRequest.and.returnValue(throwError('Error'));
    privateCollaborationServiceStub.isCollaborating.and.returnValue(of(false));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(() => fail('Should have failed!'), error => {
        expect(notificationServiceStub.hasSentCollaborationRequest).toHaveBeenCalledWith('username', 'otherUser');
        expect(notificationServiceStub.hasReceivedCollaborationRequest).toHaveBeenCalledWith('username', 'otherUser');
        expect(privateCollaborationServiceStub.isCollaborating).toHaveBeenCalledWith('username', 'otherUser');

        expect(error).toEqual('Failed to retrieve user data; please try again later');
      });
  });

  it('should return an error when isCollaborating call failed', () => {
    notificationServiceStub.hasSentCollaborationRequest.and.returnValue(of(false));
    notificationServiceStub.hasReceivedCollaborationRequest.and.returnValue(of(false));
    privateCollaborationServiceStub.isCollaborating.and.returnValue(throwError('Error'));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(() => fail('Should have failed!'), error => {
        expect(notificationServiceStub.hasSentCollaborationRequest).toHaveBeenCalledWith('username', 'otherUser');
        expect(notificationServiceStub.hasReceivedCollaborationRequest).toHaveBeenCalledWith('username', 'otherUser');
        expect(privateCollaborationServiceStub.isCollaborating).toHaveBeenCalledWith('username', 'otherUser');

        expect(error).toEqual('Failed to retrieve user data; please try again later');
      });
  });
});
