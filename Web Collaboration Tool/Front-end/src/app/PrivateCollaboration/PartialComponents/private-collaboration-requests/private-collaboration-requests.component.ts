import { Component, OnInit } from '@angular/core';
import {IPrivateCollaborationRequest} from '../../../Utility/Interfaces/IPrivateCollaborationRequest';
import {ActivatedRoute} from '@angular/router';
import {RxStompService} from '@stomp/ng2-stompjs';

@Component({
  selector: 'app-private-collaboration-requests',
  templateUrl: './private-collaboration-requests.component.html',
  styleUrls: ['./private-collaboration-requests.component.css']
})
export class PrivateCollaborationRequestsComponent implements OnInit {
  public requests: Array<IPrivateCollaborationRequest>;

  public resolverError: string;

  constructor(private activatedRoute: ActivatedRoute, private rxStompService: RxStompService) {
    this.requests = new Array<IPrivateCollaborationRequest>();

    this.resolverError = '';
  }

  public ngOnInit(): void {
    this.activatedRoute.data
      .subscribe((data: { requests: Array<IPrivateCollaborationRequest> }) => this.requests = data.requests,
                 error => this.resolverError = error);
  }

  public onCollaborationRequestResponse(response: boolean, request: IPrivateCollaborationRequest): void {
    this.requests = this.requests.filter(item => item !== request);

    request.isAccepted = response;
    this.rxStompService.publish({ destination: `/app/user/collaboration/response/${request.sender}`, body: JSON.stringify(request)});
  }
}
