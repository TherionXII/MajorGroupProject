import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GroupService} from '../../Services/group.service';
import {IGroup} from '../../Interfaces/IGroup';
import {ActivatedRoute, Router} from '@angular/router';
import {IGroupCollaborationRequest} from '../../../Utility/Interfaces/IGroupCollaborationRequest';

@Component({
  selector: 'app-group-collaboration-page',
  templateUrl: './group-collaboration-home.component.html',
  styleUrls: ['./group-collaboration-home.component.css']
})
export class GroupCollaborationHomeComponent implements OnInit {
  public userGroups: Array<IGroup>;
  public groupInvitations: Array<IGroupCollaborationRequest>;

  public newGroupForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private groupService: GroupService,
              private router: Router) { }

  public ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: { userGroups: Array<any>}) => {
      this.userGroups = data.userGroups[0];
      this.groupInvitations = data.userGroups[1];
    });

    this.newGroupForm = new FormGroup({
      title: new FormControl('', [ Validators.required ]),
      description: new FormControl('', [ Validators.required ])
    });
  }

  public onSubmit(): void {
    this.groupService.createGroup(this.newGroupForm.getRawValue() as IGroup, localStorage.getItem('username'))
      .subscribe(groupId => this.router.navigateByUrl('/group/' + groupId));
  }

  public onInvitationResponse(invitation: IGroupCollaborationRequest, isAccepted: boolean): void {
    invitation.isAccepted = isAccepted;

    this.groupService.respondToInvitation(invitation).subscribe(id => this.onSuccess(id, isAccepted, invitation), error => console.log(error));
  }

  private onSuccess(id: number, isAccepted: boolean, invitation: IGroupCollaborationRequest): void {
    if(isAccepted)
      this.router.navigateByUrl(`/group/${id}`);
    else
      this.groupInvitations = this.groupInvitations.filter(item => item !== invitation);
  }
}
