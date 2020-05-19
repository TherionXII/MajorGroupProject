import { Component, OnInit } from '@angular/core';
import {IPrivateCollaboration} from '../../Interfaces/IPrivateCollaboration';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-private-collaboration-chats',
  templateUrl: './private-collaboration-chats.component.html',
  styleUrls: ['./private-collaboration-chats.component.css']
})
export class PrivateCollaborationChatsComponent implements OnInit {
  public collaborations: Array<IPrivateCollaboration>;

  public loggedInUser: string;

  public resolverError: string;

  constructor(private activatedRoute: ActivatedRoute) {
    this.collaborations = new Array<IPrivateCollaboration>();
    this.loggedInUser = '';
    this.resolverError = '';
  }

  public ngOnInit(): void {
    this.activatedRoute.data
      .subscribe((data: { privateCollaborations: Array<IPrivateCollaboration> }) => this.collaborations = data.privateCollaborations,
                 error => this.resolverError = error);

    this.loggedInUser = localStorage.getItem('username');
  }
}
