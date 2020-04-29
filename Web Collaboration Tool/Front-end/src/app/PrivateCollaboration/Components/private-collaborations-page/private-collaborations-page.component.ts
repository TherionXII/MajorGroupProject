import { Component, OnInit } from '@angular/core';
import {IPrivateCollaboration} from '../../Interfaces/IPrivateCollaboration';
import {ActivatedRoute, Router} from '@angular/router';
import {ThreadService} from '../../../Utility/Services/thread.service';
import {RxStompService} from '@stomp/ng2-stompjs';
import {IPrivateCollaborationRequest} from '../../../Utility/Interfaces/IPrivateCollaborationRequest';

@Component({
  selector: 'app-private-collaborations-page',
  templateUrl: './private-collaborations-page.component.html',
  styleUrls: ['./private-collaborations-page.component.css']
})
export class PrivateCollaborationsPageComponent implements OnInit {
  public collaborations: Array<IPrivateCollaboration>;
  public requests: Array<IPrivateCollaborationRequest>;

  public username: string;

  constructor(private activatedRoute: ActivatedRoute,
              private threadService: ThreadService,
              private rxStompService: RxStompService,
              private router: Router) { }

  public ngOnInit(): void {
    this.username = localStorage.getItem('username');

    this.activatedRoute.data.subscribe((data: { privateCollaborations: Array<IPrivateCollaboration>, requests: Array<IPrivateCollaborationRequest> }) => {
      this.collaborations = data.privateCollaborations;
      this.requests = data.requests;
    });
  }

  public onNewThread(collaboration: IPrivateCollaboration): void {
    this.threadService.createNewThread(collaboration.collaboratorOneUsername, collaboration.collaboratorTwoUsername)
      .subscribe(response => this.router.navigateByUrl(`/thread/${response}`));
  }

  public onCollaborationRequestResponse(response: boolean, request: IPrivateCollaborationRequest): void {
    this.requests = this.requests.filter(item => item !== request);

    request.isAccepted = response;
    this.rxStompService.publish({ destination: `/app/user/collaboration/response/${request.sender}`, body: JSON.stringify(request)})
  }
}
