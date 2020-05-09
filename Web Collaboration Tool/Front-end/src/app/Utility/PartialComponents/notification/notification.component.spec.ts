import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationComponent } from './notification.component';
import {RxStompService} from '@stomp/ng2-stompjs';
import {NotificationsService} from 'angular2-notifications';
import {of} from 'rxjs';
import {INotification} from '../../Interfaces/INotification';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('NotificationModuleComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  const rxStompServiceStub = jasmine.createSpyObj('RxStompService', [ 'watch' ]);
  const notificationsServiceStub = jasmine.createSpyObj('NotificationsService', [ 'info' ]);

  const mockNotification = { title: 'title', content: 'content' } as INotification;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationComponent ],
      providers: [
        { provide: RxStompService, useValue: rxStompServiceStub },
        { provide: NotificationsService, useValue: notificationsServiceStub }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => spyOn(localStorage, 'getItem').and.returnValue('username'));

  beforeEach(() => rxStompServiceStub.watch.and.returnValue(of({ body: JSON.stringify(mockNotification) })));
  beforeEach(() => notificationsServiceStub.info.and.returnValue());

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe from the notification subscription on destroy', () => {
    const subscriptionSpy = spyOn((component as any).notificationSubscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(subscriptionSpy).toHaveBeenCalled();
  });

  it('should receive the notification and display it', () => {
    expect(notificationsServiceStub.info).toHaveBeenCalledWith(mockNotification.title, mockNotification.content);
  });
});
