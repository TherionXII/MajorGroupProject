import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RxStompService} from '@stomp/ng2-stompjs';
import {INotification} from '../../../Utility/Interfaces/INotification';
import {IPrivateCollaborationRequest} from '../../../Utility/Interfaces/IPrivateCollaborationRequest';

@Component({
  selector: 'app-user-collaboration-pane',
  templateUrl: './user-collaboration-pane.component.html',
  styleUrls: ['./user-collaboration-pane.component.css']
})
export class UserCollaborationPaneComponent implements OnInit {
  public hasSentRequest: boolean;
  public hasReceivedRequest: boolean;
  public isCollaborating: boolean;

  private username: string;

  constructor(private route: ActivatedRoute,
              private rxStompService: RxStompService) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: { collaborationStatus: any } ) => {
      this.hasSentRequest = data.collaborationStatus[0];
      this.hasReceivedRequest = data.collaborationStatus[1];
      this.isCollaborating = data.collaborationStatus[2];
    });

    this.username = this.route.snapshot.paramMap.get('username');
  }

  public onCollaborationRequest(): void {
    this.hasSentRequest = true;
    this.rxStompService.publish({ destination: `/app/user/collaboration/request/${this.username}`, body: JSON.stringify(this.composeRequestBody()) });
  }

  public onCollaborationRequestResponse(response: boolean): void {
    if(response) this.onAccept();
    else this.onReject();
    this.rxStompService.publish({ destination: `/app/user/collaboration/response/${this.username}`, body: JSON.stringify(this.composeResponseBody(response))})
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('username') !== null;
  }

  public isLoggedInUser(): boolean {
    return localStorage.getItem('username') ? localStorage.getItem('username') === this.username : false;
  }

  private composeRequestBody(): IPrivateCollaborationRequest {
    return { recipient: this.username, sender: localStorage.getItem('username'), isAccepted: false } as IPrivateCollaborationRequest;
  }

  private composeResponseBody(response: boolean): IPrivateCollaborationRequest {
    return { recipient: localStorage.getItem('username'), sender: this.username, isAccepted: response } as IPrivateCollaborationRequest;
  }

  private onAccept(): void {
    this.isCollaborating = true;
  }

  private onReject(): void {
    this.hasReceivedRequest = false;
    this.hasSentRequest = false;
  }
}
