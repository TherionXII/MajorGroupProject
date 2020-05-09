import { TestBed } from '@angular/core/testing';

import { UserNotificationResolverService } from './user-notification-resolver.service';
import {RouterTestingModule} from '@angular/router/testing';
import {NotificationService} from '../../Services/notification.service';
import {of, throwError} from 'rxjs';
import {INotification} from '../../Interfaces/INotification';
import {ActivatedRoute, Router} from '@angular/router';

describe('UserNotificationResolverService', () => {
  let service: UserNotificationResolverService;

  const notificationServiceStub = jasmine.createSpyObj('NotificationService', [ 'getAllNotificationsForUser' ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [ { provide: NotificationService, useValue: notificationServiceStub } ]
    });
    service = TestBed.inject(UserNotificationResolverService);
  });

  beforeEach(() => spyOn(localStorage, 'getItem').and.returnValue('username'));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return array of notifications', () => {
    notificationServiceStub.getAllNotificationsForUser.and.returnValue(of([ {} as INotification, {} as INotification ]));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(notifications => {
        expect(notificationServiceStub.getAllNotificationsForUser).toHaveBeenCalledWith('username');

        expect(notifications.length).toEqual(2);
      }, () => fail('Should have succeeded!'));
  });

  it('should return an error when failed to retrieve notifications', () => {
    notificationServiceStub.getAllNotificationsForUser.and.returnValue(throwError('Error'));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(() => fail('Should have failed!'), error => {
        expect(notificationServiceStub.getAllNotificationsForUser).toHaveBeenCalledWith('username');

        expect(error).toEqual('Failed to retrieve notifications; please try again later');
      });
  });
});
