import { TestBed } from '@angular/core/testing';

import { GroupCollaborationResolverService } from './group-collaboration-resolver.service';
import {RouterTestingModule} from '@angular/router/testing';
import {GroupService} from '../Services/group.service';
import {IGroup} from '../Interfaces/IGroup';
import {IGroupCollaborationRequest} from '../../Utility/Interfaces/IGroupCollaborationRequest';
import {of, throwError} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

describe('GroupCollaborationResolverService', () => {
  let service: GroupCollaborationResolverService;

  const groupServiceStub = jasmine.createSpyObj('GroupService', [ 'getUserGroups', 'getGroupInvitationsForUser' ]);
  const mockGroups = [ {} as IGroup, {} as IGroup ];
  const mockGroupCollaborationRequests = [ {} as IGroupCollaborationRequest, {} as IGroupCollaborationRequest ];

  beforeEach( () => {
    let store = {};

    spyOn(localStorage, 'getItem').and.callFake((key) => store[key]);
    spyOn(localStorage, 'setItem').and.callFake( (key, value) => store[key] = value + '');
    spyOn(localStorage, 'clear').and.callFake(() => store = {});

    localStorage.setItem('username', 'username');
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [ { provide: GroupService, useValue: groupServiceStub }]
    });
    service = TestBed.inject(GroupCollaborationResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return valid data when successful', () => {
    groupServiceStub.getUserGroups.and.returnValue(of(mockGroups));
    groupServiceStub.getGroupInvitationsForUser.and.returnValue(of(mockGroupCollaborationRequests));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(data => {
        expect(groupServiceStub.getUserGroups).toHaveBeenCalledWith(localStorage.getItem('username'));
        expect(groupServiceStub.getGroupInvitationsForUser).toHaveBeenCalledWith(localStorage.getItem('username'));

        expect(data[0]).toEqual(mockGroups);
        expect(data[1]).toEqual(mockGroupCollaborationRequests);
      }, error => fail('Should not have failed!'));
  });

  it('should return an error when failed to retrieve user groups', () => {
    groupServiceStub.getUserGroups.and.returnValue(throwError('Error'));
    groupServiceStub.getGroupInvitationsForUser.and.returnValue(of(mockGroupCollaborationRequests));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(() => fail('Should have failed!'),
                 error => expect(error).toEqual('Failed to retrieve group data; please try again later'));
  });

  it('should return an error when failed to retrieve user invitations', () => {
    groupServiceStub.getUserGroups.and.returnValue(of(mockGroups));
    groupServiceStub.getGroupInvitationsForUser.and.returnValue(throwError('Error'));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(() => fail('Should have failed!'),
        error => expect(error).toEqual('Failed to retrieve group data; please try again later'));
  });
});
