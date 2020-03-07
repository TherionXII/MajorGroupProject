import {Component, OnDestroy, OnInit} from '@angular/core';
import {IMessage} from '../../Utility/Interfaces/IMessage';
import {ActivatedRoute} from '@angular/router';
import {FormControl} from '@angular/forms';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-private-collaboration-chat',
  templateUrl: './private-collaboration-chat.component.html',
  styleUrls: ['./private-collaboration-chat.component.css']
})
export class PrivateCollaborationChatComponent implements OnInit, OnDestroy {
  public messages: Array<IMessage>;
  public username: string;

  public messageFormControl: FormControl;
  private chatSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private rxStompService: RxStompService) { }

  public ngOnInit(): void {
    this.username = localStorage.getItem('username');

    this.activatedRoute.data.subscribe((data: { messages: Array<IMessage> }) => this.messages = data.messages);

    this.messageFormControl = new FormControl('');

    this.chatSubscription = this.rxStompService.watch(`/topic/user/collaboration/chat/${this.activatedRoute.snapshot.paramMap.get('id')}`)
                                               .subscribe(request => this.messages.push(JSON.parse(request.body) as IMessage));
  }

  public ngOnDestroy(): void {
    this.chatSubscription.unsubscribe();
  }

  public onMessageSend(): void {
    const body = this.prepareMessageBody();

    this.messageFormControl.reset('');

    this.rxStompService.publish({ destination: `/app/user/collaboration/chat/${this.activatedRoute.snapshot.paramMap.get('id')}`,
                                             body: JSON.stringify(body) })
  }

  private prepareMessageBody(): IMessage {
    return { message: this.messageFormControl.value, sender: localStorage.getItem('username') };
  }
}
