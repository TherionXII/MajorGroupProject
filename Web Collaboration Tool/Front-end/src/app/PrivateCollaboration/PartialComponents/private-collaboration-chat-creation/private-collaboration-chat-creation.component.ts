import { Component, OnInit } from '@angular/core';
import {IPrivateCollaboration} from '../../Interfaces/IPrivateCollaboration';
import {ActivatedRoute, Router} from '@angular/router';
import {ThreadService} from '../../../Utility/Services/thread.service';

@Component({
  selector: 'app-private-collaboration-chat-creation',
  templateUrl: './private-collaboration-chat-creation.component.html',
  styleUrls: ['./private-collaboration-chat-creation.component.css']
})
export class PrivateCollaborationChatCreationComponent implements OnInit {
  public collaborations: Array<IPrivateCollaboration>;

  public loggedInUser: string;

  public chatError: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private threadService: ThreadService) {
    this.collaborations = new Array<IPrivateCollaboration>();
    this.loggedInUser = '';
    this.chatError = '';
  }

  public ngOnInit(): void {
    this.activatedRoute.data
      .subscribe((data: { privateCollaborations: Array<IPrivateCollaboration> }) => this.collaborations = data.privateCollaborations,
                 error => this.chatError = error);

    this.loggedInUser = localStorage.getItem('username');
  }

  public onNewThread(collaboration: IPrivateCollaboration): void {
    this.threadService.createNewThread(collaboration.collaboratorOneUsername, collaboration.collaboratorTwoUsername)
      .subscribe(threadId => this.router.navigateByUrl(`/thread/${threadId}`),
                () => this.chatError = 'Failed to create new chat; please try again later');
  }
}
