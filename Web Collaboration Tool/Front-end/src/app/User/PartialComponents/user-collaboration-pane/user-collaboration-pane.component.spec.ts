import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCollaborationPaneComponent } from './user-collaboration-pane.component';
import {of, throwError} from 'rxjs';
import {UserModule} from '../../user.module';
import {RouterTestingModule} from '@angular/router/testing';
import {RxStompService} from '@stomp/ng2-stompjs';
import {ActivatedRoute} from '@angular/router';
import {IPrivateCollaborationRequest} from '../../../Utility/Interfaces/IPrivateCollaborationRequest';

describe('UserCollaborationPaneComponent', () => {
  let component: UserCollaborationPaneComponent;
  let fixture: ComponentFixture<UserCollaborationPaneComponent>;

  const rxStompServiceStub = jasmine.createSpyObj('RxStompService', [ 'publish' ]);

  describe('testing when route resolved successfully', () => {
    const activatedRouteStub = {
      data: of({ collaborationStatus: [ false, false, false] }),
      snapshot: { paramMap: { get: (key: string) => 'username' } }
    };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ UserCollaborationPaneComponent ],
        imports: [
          UserModule,
          RouterTestingModule
        ],
        providers: [
          { provide: RxStompService, useValue: rxStompServiceStub },
          { provide: ActivatedRoute, useValue: activatedRouteStub }
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(UserCollaborationPaneComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize fields successfully', () => {
      expect(component.hasSentRequest).toBeFalse();
      expect(component.hasReceivedRequest).toBeFalse();
      expect(component.isCollaborating).toBeFalse();
      expect(component.resolverError).toEqual('');
    });

    it('should publish a request to collaborate on a public channel and set hasSentRequest to true', () => {
      rxStompServiceStub.publish.and.callFake(() => { return; });
      spyOn(localStorage, 'getItem').and.returnValue('otherUser');

      component.onCollaborationRequest();

      const expectedDestination = `/app/user/collaboration/request/username`;
      const expectedBody = JSON.stringify({ recipient: 'username', sender: 'otherUser', isAccepted: false } as IPrivateCollaborationRequest);

      expect(component.hasSentRequest).toBeTrue();
      expect(rxStompServiceStub.publish).toHaveBeenCalledWith({ destination: expectedDestination, body: expectedBody });
    });

    it('should publish response to the request on a public channel and set isCollaborating to true when accepted the request', () => {
      rxStompServiceStub.publish.and.callFake(() => { return; });
      spyOn(localStorage, 'getItem').and.returnValue('otherUser');

      component.onCollaborationRequestResponse(true);

      const expectedDestination = `/app/user/collaboration/response/username`;
      const expectedBody = JSON.stringify({ recipient: 'otherUser', sender: 'username', isAccepted: true } as IPrivateCollaborationRequest);

      expect(component.isCollaborating).toBeTrue();
      expect(component.hasReceivedRequest).toBeFalse();
      expect(component.hasSentRequest).toBeFalse();
      expect(rxStompServiceStub.publish).toHaveBeenCalledWith({ destination: expectedDestination, body: expectedBody });
    });

    it('should publish response to the request on a public channel and set isCollaborating to false when rejected the request', () => {
      rxStompServiceStub.publish.and.callFake(() => { return; });
      spyOn(localStorage, 'getItem').and.returnValue('otherUser');

      component.onCollaborationRequestResponse(false);

      const expectedDestination = `/app/user/collaboration/response/username`;
      const expectedBody = JSON.stringify({ recipient: 'otherUser', sender: 'username', isAccepted: false } as IPrivateCollaborationRequest);

      expect(component.isCollaborating).toBeFalse();
      expect(component.hasReceivedRequest).toBeFalse();
      expect(component.hasSentRequest).toBeFalse();
      expect(rxStompServiceStub.publish).toHaveBeenCalledWith({ destination: expectedDestination, body: expectedBody });
    });

    it('should return true when user accessing the page is logged in', () => {
      spyOn(localStorage, 'getItem').and.returnValue('username');

      expect(component.isLoggedIn()).toBeTrue();
    });

    it('should return false when user accessing the page is logged in', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);

      expect(component.isLoggedIn()).toBeFalse();
    });

    it('should return true when user accessing the page and logged in user are the same user', () => {
      spyOn(localStorage, 'getItem').and.returnValue('username');

      expect(component.isLoggedInUser()).toBeTrue();
    });

    it('should return false when user accessing the page and logged in user are not the same user', () => {
      spyOn(localStorage, 'getItem').and.returnValue('otherUser');

      expect(component.isLoggedInUser()).toBeFalse();
    });
  });

  describe('testing when route failed to resolve', () => {
    const activatedRouteStub = {
      data: throwError('Error'),
      snapshot: { paramMap: { get: (key: string) => 'username' } }
    };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ UserCollaborationPaneComponent ],
        imports: [
          UserModule,
          RouterTestingModule
        ],
        providers: [
          { provide: RxStompService, useValue: rxStompServiceStub },
          { provide: ActivatedRoute, useValue: activatedRouteStub }
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(UserCollaborationPaneComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should set an error message when route failed to resolve', () => {
      expect(component.resolverError).toEqual('Error');
    });
  });
});
