import { TestBed } from '@angular/core/testing';

import { GroupService } from './group.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {IGroup} from '../Interfaces/IGroup';
import {IGroupCollaborationRequest} from '../../Utility/Interfaces/IGroupCollaborationRequest';

fdescribe('GroupService', () => {
  let service: GroupService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ GroupService ]
    });
    service = TestBed.inject(GroupService);
  });

  beforeEach(() => {
    service = TestBed.inject(GroupService);
    httpTestingController = TestBed.inject(HttpTestingController);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a successful request to create a group', () => {
    service.createGroup({} as IGroup, 'adminUsername')
      .subscribe(response => expect(response.id).toEqual(0), () => fail('Should have succeeded!'));

    const request = httpTestingController.expectOne(`http://localhost:8080/api/groups/adminUsername/createGroup`);
    expect(request.request.method).toEqual('POST');
    expect(request.request.url).toEqual(`http://localhost:8080/api/groups/adminUsername/createGroup`);
    expect(request.request.body).toEqual({} as IGroup);

    request.flush({ id: 0 } as IGroup);
  })

  it('should send an unsuccessful request to create a group', () => {
    service.createGroup({} as IGroup, 'adminUsername')
      .subscribe(() => fail('Should have failed!'), error => expect(error.error).toEqual('error'));

    const request = httpTestingController.expectOne(`http://localhost:8080/api/groups/adminUsername/createGroup`);
    expect(request.request.method).toEqual('POST');
    expect(request.request.url).toEqual(`http://localhost:8080/api/groups/adminUsername/createGroup`);
    expect(request.request.body).toEqual({} as IGroup);

    request.flush('error', { status: 401, statusText: 'error' });
  })

  it('should send a successful request to retrieve user groups', () => {
    service.getUserGroups('username')
      .subscribe(response => expect(response.length).toEqual(2), () => fail('Should have succeeded!'));

    const request = httpTestingController.expectOne(`http://localhost:8080/api/groups/username/getGroups`);
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual(`http://localhost:8080/api/groups/username/getGroups`);

    request.flush([ {} as IGroup, {} as IGroup ]);
  });

  it('should send an unsuccessful request to retrieve user groups', () => {
    service.getUserGroups('username')
      .subscribe(() => fail('Should have failed!'), error => expect(error.error).toEqual('error'));

    const request = httpTestingController.expectOne(`http://localhost:8080/api/groups/username/getGroups`);
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual(`http://localhost:8080/api/groups/username/getGroups`);

    request.flush('error', { status: 401, statusText: 'error' });
  });

  it('should send a successful request to get a group', () => {
    service.getGroupById('0')
      .subscribe(response => expect(response.id).toEqual(0), () => fail('Should have succeeded!'));

    const request = httpTestingController.expectOne(`http://localhost:8080/api/groups/0/getGroup`);
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual(`http://localhost:8080/api/groups/0/getGroup`);

    request.flush({ id: 0 } as IGroup);
  });

  it('should send an unsuccessful request to get a group', () => {
    service.getGroupById('0')
      .subscribe(() => fail('Should have failed!'), error => expect(error.error).toEqual('error'));

    const request = httpTestingController.expectOne(`http://localhost:8080/api/groups/0/getGroup`);
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual(`http://localhost:8080/api/groups/0/getGroup`);

    request.flush('error', { status: 401, statusText: 'error' });
  });

  it('should send a successful request to get group invitations for user', () => {
    service.getGroupInvitationsForUser('username')
      .subscribe(response => expect(response.length).toEqual(2), () => fail('Should have succeeded!'));

    const request = httpTestingController.expectOne(`http://localhost:8080/api/groupRequests/username/getGroupInvitationsForUser`);
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual(`http://localhost:8080/api/groupRequests/username/getGroupInvitationsForUser`);

    request.flush([ {} as IGroupCollaborationRequest, {} as IGroupCollaborationRequest ]);
  });

  it('should send an unsuccessful request to get group invitations for user', () => {
    service.getGroupInvitationsForUser('username')
      .subscribe(() => fail('Should have failed!'), error => expect(error.error).toEqual('error'));

    const request = httpTestingController.expectOne(`http://localhost:8080/api/groupRequests/username/getGroupInvitationsForUser`);
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual(`http://localhost:8080/api/groupRequests/username/getGroupInvitationsForUser`);

    request.flush('error', { status: 401, statusText: 'error' });
  });

  it('should send a successful request to respond to group invitations', () => {
    service.respondToInvitation({} as IGroupCollaborationRequest)
      .subscribe(response => expect(response).toEqual(0), () => fail('Should have succeeded!'));

    const request = httpTestingController.expectOne(`http://localhost:8080/api/groupRequests/respond`);
    expect(request.request.method).toEqual('POST');
    expect(request.request.url).toEqual(`http://localhost:8080/api/groupRequests/respond`);
    expect(request.request.body).toEqual({} as IGroupCollaborationRequest);

    request.flush(0);
  });

  it('should send an unsuccessful request to respond to group invitations', () => {
    service.respondToInvitation({} as IGroupCollaborationRequest)
      .subscribe(() => fail('Should have failed!'), error => expect(error.error).toEqual('error'));

    const request = httpTestingController.expectOne(`http://localhost:8080/api/groupRequests/respond`);
    expect(request.request.method).toEqual('POST');
    expect(request.request.url).toEqual(`http://localhost:8080/api/groupRequests/respond`);
    expect(request.request.body).toEqual({} as IGroupCollaborationRequest);

    request.flush('error', { status: 401, statusText: 'error' });
  });

  it('should send a successful request to get group invitations for group', () => {
    service.getGroupInvitationsForGroup('0')
      .subscribe(response => expect(response.length).toEqual(2), () => fail('Should have succeeded!'));

    const request = httpTestingController.expectOne(`http://localhost:8080/api/groupRequests/0/getGroupInvitationsForGroup`);
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual(`http://localhost:8080/api/groupRequests/0/getGroupInvitationsForGroup`);

    request.flush([ {} as IGroupCollaborationRequest, {} as IGroupCollaborationRequest ]);
  });

  it('should send an unsuccessful request to get group invitations for user', () => {
    service.getGroupInvitationsForGroup('0')
      .subscribe(() => fail('Should have failed!'), error => expect(error.error).toEqual('error'));

    const request = httpTestingController.expectOne(`http://localhost:8080/api/groupRequests/0/getGroupInvitationsForGroup`);
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual(`http://localhost:8080/api/groupRequests/0/getGroupInvitationsForGroup`);

    request.flush('error', { status: 401, statusText: 'error' });
  });
});
