import { Component, OnInit } from '@angular/core';
import {IGroup} from '../../Interfaces/IGroup';
import {ActivatedRoute} from '@angular/router';
import {IPrivateCollaboration} from '../../../PrivateCollaboration/Interfaces/IPrivateCollaboration';
import {IGroupCollaborationRequest} from '../../../Utility/Interfaces/IGroupCollaborationRequest';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  public group: IGroup;
  public groupInvitations: Array<IGroupCollaborationRequest>;
  public privateCollaborations: Array<IPrivateCollaboration>;

  public username: string;

  constructor(private activatedRoute: ActivatedRoute) {}

  public ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: { groupData: IGroup, privateCollaborations: Array<IPrivateCollaboration> }) => {
      this.group = data.groupData[0];
      this.groupInvitations = data.groupData[1];
      this.privateCollaborations = data.privateCollaborations;
    });

    this.username = localStorage.getItem('username');
  }


}
