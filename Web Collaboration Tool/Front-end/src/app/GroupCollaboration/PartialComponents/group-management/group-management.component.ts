import {Component, Input, OnInit} from '@angular/core';
import {IGroup} from '../../Interfaces/IGroup';
import {IPrivateCollaboration} from '../../../PrivateCollaboration/Interfaces/IPrivateCollaboration';
import {IGroupMember} from '../../Interfaces/IGroupMember';
import {RxStompService} from '@stomp/ng2-stompjs';
import {IGroupCollaborationRequest} from '../../../Utility/Interfaces/IGroupCollaborationRequest';
import {GroupService} from '../../Services/group.service';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.css']
})
export class GroupManagementComponent implements OnInit {
  @Input()
  public group: IGroup;

  @Input()
  public privateCollaborations: Array<IPrivateCollaboration>;

  @Input()
  public username: string;

  @Input()
  public groupInvitations: Array<IGroupCollaborationRequest>;

  public userMember: IGroupMember;

  constructor(private rxStompService: RxStompService) {}

  public ngOnInit(): void {
    this.userMember = this.group.groupMembers.find(member => member.memberUsername === this.username);
  }

  public onMakeAdmin(username: string): void {
    this.rxStompService.publish({ destination: `/app/user/collaboration/makeAdmin/${this.group.id}/${username}`});
  }

  public onRemoveFromGroup(username: string): void {
    this.rxStompService.publish({ destination: `/app/user/collaboration/removeFromGroup/${this.group.id}/${username}`})
  }

  public getCollaboratorUsername(collaboration: IPrivateCollaboration): string {
    return collaboration.collaboratorOneUsername === this.username ? collaboration.collaboratorTwoUsername : collaboration.collaboratorOneUsername;
  }

  public onInviteToGroup(username: string): void {
    this.rxStompService.publish({ destination: `/app/user/collaboration/invitation/${username}`, body: JSON.stringify(this.prepareRequestBody(username))});
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
