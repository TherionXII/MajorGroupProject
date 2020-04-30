import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupManagementComponent } from './group-management.component';
import {IGroupCollaborationRequest} from '../../../Utility/Interfaces/IGroupCollaborationRequest';
import {IGroupMember} from '../../Interfaces/IGroupMember';
import {of} from 'rxjs';
import {IGroup} from '../../Interfaces/IGroup';
import {IPrivateCollaboration} from '../../../PrivateCollaboration/Interfaces/IPrivateCollaboration';
import {GroupCollaborationModule} from '../../group-collaboration.module';
import {RxStompService} from '@stomp/ng2-stompjs';
import {ActivatedRoute} from '@angular/router';

fdescribe('GroupManagementComponent', () => {
  let component: GroupManagementComponent;
  let fixture: ComponentFixture<GroupManagementComponent>;

  const groupInvitations = [ { recipient: 'invitedUser1' } as IGroupCollaborationRequest, { recipient: 'invitedUser2' } as IGroupCollaborationRequest ];
  const group = {
    id: 0,
    groupMembers: [
      {memberUsername: 'memberUser1', isAdmin: true} as IGroupMember,
      {memberUsername: 'memberUser2', isAdmin: false} as IGroupMember
    ]
  } as IGroup;
  const privateCollaborations = [
    { collaboratorOneUsername: 'memberUser1', collaboratorTwoUsername: 'invitedUser1' } as IPrivateCollaboration,
    { collaboratorOneUsername: 'nonInvitedUser1', collaboratorTwoUsername: 'memberUser1' } as IPrivateCollaboration,
  ];

  const loggedInGroupMemberUsername = 'memberUser1';
  const activatedRouteStub = { data: of({ groupData: [ group, groupInvitations ], privateCollaborations } )};

  const rxStompServiceStub = jasmine.createSpyObj('RxStompService', [ 'publish' ]);

  beforeEach( () => {
    let store = {};

    spyOn(localStorage, 'getItem').and.callFake((key) => store[key]);
    spyOn(localStorage, 'setItem').and.callFake( (key, value) => store[key] = value + '');
    spyOn(localStorage, 'clear').and.callFake(() => store = {});

    localStorage.setItem('username', loggedInGroupMemberUsername);
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupManagementComponent ],
      imports: [ GroupCollaborationModule ],
      providers: [
        { provide: RxStompService, useValue: rxStompServiceStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupManagementComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize fields properly', () => {
    expect(component.group).toEqual(group);
    expect(component.groupInvitations).toEqual(groupInvitations);
    expect(component.privateCollaborations).toEqual(privateCollaborations);
    expect(component.loggedInGroupMember.memberUsername).toEqual(loggedInGroupMemberUsername);
  });

  it('should publish a message on a web socket channel when user is made an admin', () => {
    rxStompServiceStub.publish.and.returnValue('');

    component.onMakeAdmin(group.groupMembers[1].memberUsername);

    expect(rxStompServiceStub.publish).toHaveBeenCalledWith({ destination: `/app/user/collaboration/makeAdmin/${group.id}/${component.group.groupMembers[1].memberUsername}`});
  });

  it('should publish a message on a web socket channel when user is removed from the group', () => {
    rxStompServiceStub.publish.and.returnValue('');

    component.onRemoveFromGroup(group.groupMembers[1].memberUsername);

    expect(rxStompServiceStub.publish).toHaveBeenCalledWith({ destination: `/app/user/collaboration/removeFromGroup/${group.id}/${component.group.groupMembers[1].memberUsername}`});
  });

  it('should return the name of the collaborator who is not currently logged in', () => {
    expect(component.getCollaboratorUsername(component.privateCollaborations[0])).toEqual(privateCollaborations[0].collaboratorTwoUsername);
    expect(component.getCollaboratorUsername(component.privateCollaborations[1])).toEqual(privateCollaborations[1].collaboratorOneUsername);
  });

  it('should publish a message on a web socket channel when user is invited to the group', () => {
    rxStompServiceStub.publish.and.returnValue('');

    const expectedUsername = component.privateCollaborations[1].collaboratorOneUsername;
    const expectedBody = JSON.stringify({ groupId: component.group.id, recipient: expectedUsername, isAccepted: false } as IGroupCollaborationRequest);

    component.onInviteToGroup(expectedUsername);

    expect(rxStompServiceStub.publish).toHaveBeenCalledWith({destination: `/app/user/collaboration/invitation/${expectedUsername}`, body: expectedBody})
  });

  it('should return true when a user with the given username is in group', () => {
    expect(component.isInGroup(component.group.groupMembers[0].memberUsername)).toBeTrue();
  });

  it('should return false when a user with the given username is not in group', () => {
    expect(component.isInGroup('nonMemberUsername')).toBeFalse();
  });

  it('should return true when a user with the given username has been invited to the group', () => {
    expect(component.hasBeenInvited('invitedUser1')).toBeTrue();
  });

  it('should return false when a user with the given username has not been invited to the group', () => {
    expect(component.hasBeenInvited('nonInvitedUser')).toBeFalse();
  });
});
