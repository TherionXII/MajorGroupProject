import {Component, OnDestroy, OnInit} from '@angular/core';
import {IMessage} from '../../Interfaces/IMessage';
import {ActivatedRoute} from '@angular/router';
import {FormControl} from '@angular/forms';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  public messages: Array<IMessage>;
  public username: string;

  public messageFormControl: FormControl;

  public resolverError: string;

  private chatSubscription: Subscription;
  private watchChannel: string;
  private publishChannel: string;

  constructor(private activatedRoute: ActivatedRoute, private rxStompService: RxStompService) {
    this.messages = new Array<IMessage>();
    this.resolverError = '';

    this.chatSubscription = new Subscription();
  }

  public ngOnInit(): void {
    this.username = localStorage.getItem('username');

    this.activatedRoute.data.subscribe((data: { chatData: [ Array<IMessage>, string, string ] }) => {
      this.messages = data.chatData[0];
      this.watchChannel = data.chatData[1];
      this.publishChannel = data.chatData[2];

      this.chatSubscription = this.rxStompService.watch(this.watchChannel)
        .subscribe(request => this.messages.push(JSON.parse(request.body)));
    }, error => this.resolverError = error);

    this.messageFormControl = new FormControl('');
  }

  public ngOnDestroy(): void {
    this.chatSubscription.unsubscribe();
  }

  public onMessageSend(): void {
    const body = this.prepareMessageBody();

    this.messageFormControl.reset('');

    this.rxStompService.publish({ destination: this.publishChannel, body: JSON.stringify(body) })
  }

  private prepareMessageBody(): IMessage {
    return { message: this.messageFormControl.value, sender: localStorage.getItem('username') };
  }
}
