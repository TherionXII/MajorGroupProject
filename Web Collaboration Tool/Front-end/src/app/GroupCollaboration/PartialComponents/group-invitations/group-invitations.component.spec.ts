import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupInvitationsComponent } from './group-invitations.component';
import {GroupCollaborationModule} from '../../group-collaboration.module';
import {RouterTestingModule} from '@angular/router/testing';
import {GroupService} from '../../Services/group.service';
import {Observable, of, Subscription, throwError} from 'rxjs';
import {IGroupCollaborationRequest} from '../../../Utility/Interfaces/IGroupCollaborationRequest';
import {ActivatedRoute, Router} from '@angular/router';
import {Type} from '@angular/core';
import Spy = jasmine.Spy;

describe('GroupInvitationsComponent', () => {
  let component: GroupInvitationsComponent;
  let fixture: ComponentFixture<GroupInvitationsComponent>;

  const groupServiceStub = jasmine.createSpyObj('GroupService', [ 'respondToInvitation' ]);

  describe(' testing when route has resolved', () => {
    const firstGroupInvitation = { group: { title: 'title1' } } as IGroupCollaborationRequest;
    const secondGroupInvitation = { group: { title: 'title1' } } as IGroupCollaborationRequest;
    const activatedRouteStub = { data: of({ userGroups:  ['', [ firstGroupInvitation, secondGroupInvitation ] ] } )};


    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ GroupInvitationsComponent ],
        imports: [
          GroupCollaborationModule,
          RouterTestingModule
        ],
        providers: [
          { provide: GroupService, useValue: groupServiceStub },
          { provide: ActivatedRoute, useValue: activatedRouteStub }
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(GroupInvitationsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize fields successfully', () => {
      expect(component.groupInvitations[0]).toEqual(firstGroupInvitation);
      expect(component.groupInvitations[1]).toEqual(secondGroupInvitation);
      expect(component.requestError).toEqual('');
    });

    describe(' invitations logic', () => {
      let routerNavigateByUrl: Spy;

      beforeEach(() => {
        const router = TestBed.inject(Router as Type<Router>);
        routerNavigateByUrl = spyOn(router, 'navigateByUrl');
      });

      it('should redirect to group page when responded to invitation positively and request succeeded', () => {
        groupServiceStub.respondToInvitation.and.returnValue(of(1));

        component.onInvitationResponse(firstGroupInvitation, true);

        expect(groupServiceStub.respondToInvitation).toHaveBeenCalledWith(firstGroupInvitation);
        expect(routerNavigateByUrl).toHaveBeenCalledWith('/group/1');
        expect(component.requestError).toEqual('');
      });

      it('should set an error message when responded to invitation positively but request failed', () => {
        groupServiceStub.respondToInvitation.and.returnValue(throwError('Error'));

        component.onInvitationResponse(firstGroupInvitation, true);

        expect(groupServiceStub.respondToInvitation).toHaveBeenCalledWith(firstGroupInvitation);
        expect(routerNavigateByUrl).not.toHaveBeenCalledWith('/group/1');
        expect(component.requestError).toEqual('Something went wrong; please try again later');
      });

      it('should remove invitation from list of invitation when responded to invitation negatively and request succeeded', () => {
        groupServiceStub.respondToInvitation.and.returnValue(of(1));

        component.onInvitationResponse(firstGroupInvitation, false);

        expect(groupServiceStub.respondToInvitation).toHaveBeenCalledWith(firstGroupInvitation);
        expect(routerNavigateByUrl).not.toHaveBeenCalledWith('/group/1');
        expect(component.groupInvitations.includes(firstGroupInvitation)).toBeFalse();
        expect(component.requestError).toEqual('');
      });

      it('should set an error message when responded to invitation negatively but request failed', () => {
        groupServiceStub.respondToInvitation.and.returnValue(throwError('Error'));

        component.onInvitationResponse(firstGroupInvitation, false);

        expect(groupServiceStub.respondToInvitation).toHaveBeenCalledWith(firstGroupInvitation);
        expect(routerNavigateByUrl).not.toHaveBeenCalledWith('/group/1');
        expect(component.groupInvitations.includes(firstGroupInvitation)).toBeTrue();
        expect(component.requestError).toEqual('Something went wrong; please try again later');
      });
    })
  });

  describe(' testing component when route failed to resolve', () => {
    const activatedRouteStub = { data: throwError('Failed to retrieve group data; please try again later')};

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ GroupInvitationsComponent ],
        imports: [
          GroupCollaborationModule,
          RouterTestingModule
        ],
        providers: [
          { provide: GroupService, useValue: groupServiceStub },
          { provide: ActivatedRoute, useValue: activatedRouteStub }
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(GroupInvitationsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should set an error message and initialize fields successfully', () => {
      expect(component.requestError).toEqual('Failed to retrieve group data; please try again later');
      expect(component.groupInvitations.length).toEqual(0);
    });
  })
});
