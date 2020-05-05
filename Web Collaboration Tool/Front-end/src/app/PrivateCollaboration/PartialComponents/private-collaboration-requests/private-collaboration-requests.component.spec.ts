import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCollaborationRequestsComponent } from './private-collaboration-requests.component';
import {of, throwError} from 'rxjs';
import {IPrivateCollaborationRequest} from '../../../Utility/Interfaces/IPrivateCollaborationRequest';
import {PrivateCollaborationModule} from '../../private-collaboration.module';
import {RouterTestingModule} from '@angular/router/testing';
import {RxStompService} from '@stomp/ng2-stompjs';
import {ActivatedRoute} from '@angular/router';

describe('PrivateCollaborationRequestsComponent', () => {
  let component: PrivateCollaborationRequestsComponent;
  let fixture: ComponentFixture<PrivateCollaborationRequestsComponent>;

  const rxStompServiceStub = jasmine.createSpyObj('RxStompService', [ 'publish' ]);

  describe('testing when route resolved successfully', () => {
    const mockRequests = [ { sender: 'user1' } as IPrivateCollaborationRequest, { sender: 'user2' } as IPrivateCollaborationRequest ];
    const activatedRouteStub = { data: of({ requests: mockRequests }) };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ PrivateCollaborationRequestsComponent ],
        imports: [
          PrivateCollaborationModule,
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
      fixture = TestBed.createComponent(PrivateCollaborationRequestsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize fields successfully', () => {
      expect(component.requests).toEqual(mockRequests);
      expect(component.resolverError).toEqual('');
    });

    it('should publish response to the collaboration request and remove it from the list', () => {
      const request = component.requests[0];

      rxStompServiceStub.publish.and.returnValue();

      component.onCollaborationRequestResponse(true, request);

      expect(request.isAccepted).toBeTrue();
      expect(rxStompServiceStub.publish).toHaveBeenCalledWith({ destination: `/app/user/collaboration/response/${request.sender}`,
                                                                       body: JSON.stringify(request)});
      expect(component.requests.includes(request)).toBeFalse();
    });
  });

  describe(' testing when route failed to resolve', () => {
    const activatedRouteStub = { data: throwError('Error') };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ PrivateCollaborationRequestsComponent ],
        imports: [
          PrivateCollaborationModule,
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
      fixture = TestBed.createComponent(PrivateCollaborationRequestsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should set an error message when route failed to resolve', () => {
      expect(component.requests.length).toEqual(0);
      expect(component.resolverError).toEqual('Error');
    });
  });
});
