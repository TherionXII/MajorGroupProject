import { Component, OnInit } from '@angular/core';
import {IGroupCollaborationRequest} from '../../../Utility/Interfaces/IGroupCollaborationRequest';
import {GroupService} from '../../Services/group.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-group-invitations',
  templateUrl: './group-invitations.component.html',
  styleUrls: ['./group-invitations.component.css']
})
export class GroupInvitationsComponent implements OnInit {
  public groupInvitations: Array<IGroupCollaborationRequest>;
  public invitationResponseError: string;

  constructor(private activatedRoute: ActivatedRoute,
              private groupService: GroupService,
              private router: Router) {
    this.invitationResponseError = '';
  }

  public ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: { userGroups: [ any, Array<IGroupCollaborationRequest> ]}) => {
      this.groupInvitations = data.userGroups[1];
    });
  }

  public onInvitationResponse(invitation: IGroupCollaborationRequest, isAccepted: boolean): void {
    invitation.isAccepted = isAccepted;

    this.groupService.respondToInvitation(invitation).subscribe(id => this.onSuccess(id, isAccepted, invitation),
                                                                () => this.invitationResponseError = 'Something went wrong; please try again later');
  }

  private onSuccess(id: number, isAccepted: boolean, invitation: IGroupCollaborationRequest): void {
    if(isAccepted)
      this.router.navigateByUrl(`/group/${id}`);
    else
      this.groupInvitations = this.groupInvitations.filter(item => item !== invitation);
  }
}
