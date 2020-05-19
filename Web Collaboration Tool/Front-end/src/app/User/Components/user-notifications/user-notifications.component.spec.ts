import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNotificationsComponent } from './user-notifications.component';
import {of, throwError} from 'rxjs';
import {INotification} from '../../../Utility/Interfaces/INotification';
import {UserModule} from '../../user.module';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';

describe('UserNotificationsComponent', () => {
  let component: UserNotificationsComponent;
  let fixture: ComponentFixture<UserNotificationsComponent>;

  describe('testing when route resolved successfully', () => {
    const activatedRouteStub = { data: of({ notifications: [ {} as INotification, {} as INotification ] }) };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ UserNotificationsComponent ],
        imports: [
          UserModule,
          RouterTestingModule
        ],
        providers: [ { provide: ActivatedRoute, useValue: activatedRouteStub } ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(UserNotificationsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize fields successfully', () => {
      expect(component.notifications.length).toEqual(2);
      expect(component.resolverError).toEqual('');
    });
  });

  describe('testing when route failed to resolve', () => {
    const activatedRouteStub = { data: throwError('Error') };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ UserNotificationsComponent ],
        imports: [
          UserModule,
          RouterTestingModule
        ],
        providers: [ { provide: ActivatedRoute, useValue: activatedRouteStub } ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(UserNotificationsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should set an error when route failed to resolve', () => {
      expect(component.notifications.length).toEqual(0);
      expect(component.resolverError).toEqual('Error');
    });
  });
});
