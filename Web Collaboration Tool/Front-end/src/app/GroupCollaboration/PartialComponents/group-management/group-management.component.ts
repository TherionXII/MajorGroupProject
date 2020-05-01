import {Component, OnInit} from '@angular/core';
import {IGroup} from '../../Interfaces/IGroup';
import {IPrivateCollaboration} from '../../../PrivateCollaboration/Interfaces/IPrivateCollaboration';
import {IGroupMember} from '../../Interfaces/IGroupMember';
import {RxStompService} from '@stomp/ng2-stompjs';
import {IGroupCollaborationRequest} from '../../../Utility/Interfaces/IGroupCollaborationRequest';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.css']
})
export class GroupManagementComponent implements OnInit {
  public group: IGroup;
  public privateCollaborations: Array<IPrivateCollaboration>;
  public groupInvitations: Array<IGroupCollaborationRequest>;

  public loggedInGroupMember: IGroupMember;

  public resolverError: string;

  constructor(private rxStompService: RxStompService, private activatedRoute: ActivatedRoute) {
    this.resolverError = '';
    this.group = {} as IGroup;
    this.privateCollaborations = new Array<IPrivateCollaboration>();
    this.groupInvitations = new Array<IGroupCollaborationRequest>();
    this.loggedInGroupMember = {} as IGroupMember;
  }

  public ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: { groupData: IGroup, privateCollaborations: Array<IPrivateCollaboration> }) => {
      this.group = data.groupData[0];
      this.groupInvitations = data.groupData[1];
      this.privateCollaborations = data.privateCollaborations;

      this.loggedInGroupMember = this.group.groupMembers.find(member => member.memberUsername === localStorage.getItem('username'));
    }, error => this.resolverError = error);
  }

  public onMakeAdmin(username: string): void {
    this.rxStompService.publish({ destination: `/app/user/collaboration/makeAdmin/${this.group.id}/${username}`});
  }

  public onRemoveFromGroup(username: string): void {
    this.rxStompService.publish({ destination: `/app/user/collaboration/removeFromGroup/${this.group.id}/${username}`})
  }

  public getCollaboratorUsername(collaboration: IPrivateCollaboration): string {
    return collaboration.collaboratorOneUsername === localStorage.getItem('username') ?
           collaboration.collaboratorTwoUsername :
           collaboration.collaboratorOneUsername;
  }

  public onInviteToGroup(username: string): void {
    this.rxStompService.publish({
      destination: `/app/user/collaboration/invitation/${username}`,
      body: JSON.stringify(this.prepareRequestBody(username))
    });
  }

  public isInGroup(username: string): boolean {
    return this.group.groupMembers.find((member: IGroupMember) => member.memberUsername === username) !== undefined;
  }

  public hasBeenInvited(username: string): boolean {
    return this.groupInvitations.find(invitation => invitation.recipient === username) !== undefined;
  }

  private prepareRequestBody(username: string): IGroupCollaborationRequest {
    return { groupId: this.group.id, recipient: username, isAccepted: false} as IGroupCollaborationRequest;
  }
}
