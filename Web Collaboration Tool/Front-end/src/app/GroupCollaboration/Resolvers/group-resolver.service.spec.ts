import { TestBed } from '@angular/core/testing';

import { GroupResolverService } from './group-resolver.service';
import {IGroup} from '../Interfaces/IGroup';
import {IGroupCollaborationRequest} from '../../Utility/Interfaces/IGroupCollaborationRequest';
import {RouterTestingModule} from '@angular/router/testing';
import {GroupService} from '../Services/group.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Type} from '@angular/core';
import {of, throwError} from 'rxjs';

fdescribe('GroupResolverService', () => {
  let service: GroupResolverService;

  const mockGroup = {} as IGroup;
  const mockInvitations = [ {} as IGroupCollaborationRequest, {} as IGroupCollaborationRequest ];

  const groupServiceStub = jasmine.createSpyObj('GroupService', [ 'getGroupById', 'getGroupInvitationsForGroup' ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [ { provide: GroupService, useValue: groupServiceStub } ]
    });
    service = TestBed.inject(GroupResolverService);
  });

  beforeEach(() => {
    spyOn(TestBed.inject(ActivatedRoute as Type<ActivatedRoute>).snapshot.paramMap, 'get').and.returnValue('0');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return valid data when successful', () => {
    groupServiceStub.getGroupById.and.returnValue(of(mockGroup));
    groupServiceStub.getGroupInvitationsForGroup.and.returnValue(of(mockInvitations));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(data => {
        expect(groupServiceStub.getGroupById).toHaveBeenCalledWith('0');
        expect(groupServiceStub.getGroupInviationsForGroup).toHaveBeenCalledWith('0');

        expect(data[0]).toEqual(mockGroup);
        expect(data[1]).toEqual(mockInvitations);
      }, () => fail('Should have succeeded!'));
  });

  it('should return an error when failed to retrieve the group', () => {
    groupServiceStub.getGroupById.and.returnValue(throwError('Error'));
    groupServiceStub.getGroupInvitationsForGroup.and.returnValue(of(mockInvitations));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(() => fail('Should have failed!'),
                 error => expect(error).toEqual('Failed to retrieve group data; please try again later'));
  });

  it('should return an error when failed to retrieve the group invitations', () => {
    groupServiceStub.getGroupById.and.returnValue(of(mockGroup));
    groupServiceStub.getGroupInvitationsForGroup.and.returnValue(throwError('Error'));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(() => fail('Should have failed!'),
                 error => expect(error).toEqual('Failed to retrieve group data; please try again later'));
  });
});
