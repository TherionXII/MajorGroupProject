import {Component, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RxStompService} from '@stomp/ng2-stompjs';
import {IPrivateCollaborationRequest} from '../../../Utility/Interfaces/IPrivateCollaborationRequest';

@Component({
  selector: 'app-user-collaboration-pane',
  templateUrl: './user-collaboration-pane.component.html',
  styleUrls: ['./user-collaboration-pane.component.css']
})
export class UserCollaborationPaneComponent implements OnInit, OnChanges {
  public hasSentRequest: boolean;
  public hasReceivedRequest: boolean;
  public isCollaborating: boolean;

  private username: string;

  public resolverError: string;

  constructor(private route: ActivatedRoute, private rxStompService: RxStompService) {
    this.resolverError = '';
  }

  public ngOnInit(): void {
    this.route.data.subscribe((data: { collaborationStatus: [ boolean, boolean, boolean ] } ) => {
      this.hasSentRequest = data.collaborationStatus[0];
      this.hasReceivedRequest = data.collaborationStatus[1];
      this.isCollaborating = data.collaborationStatus[2];
    }, error => this.resolverError = error);

    this.username = this.route.snapshot.paramMap.get('username');
  }

  public ngOnChanges(): void {
    this.ngOnInit();
  }

  public onCollaborationRequest(): void {
    this.hasSentRequest = true;
    this.rxStompService.publish({ destination: `/app/user/collaboration/request/${this.username}`, body: JSON.stringify(this.composeRequestBody()) });
  }

  public onCollaborationRequestResponse(response: boolean): void {
    response ? this.onAccept() : this.onReject();

    this.rxStompService.publish({ destination: `/app/user/collaboration/response/${this.username}`, body: JSON.stringify(this.composeResponseBody(response))})
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('username') !== null;
  }

  public isLoggedInUser(): boolean {
    return localStorage.getItem('username') === this.username;
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
