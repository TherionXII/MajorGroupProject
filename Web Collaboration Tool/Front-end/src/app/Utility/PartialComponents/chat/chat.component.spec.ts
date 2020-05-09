import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';
import {EMPTY, of, throwError} from 'rxjs';
import {IMessage} from '../../Interfaces/IMessage';
import {UtilityModule} from '../../utility.module';
import {RxStompService} from '@stomp/ng2-stompjs';
import {ActivatedRoute} from '@angular/router';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  const rxStompServiceStub = jasmine.createSpyObj('RxStompService', [ 'watch', 'publish' ]);

  beforeEach(() => spyOn(localStorage, 'getItem').and.returnValue('username'));

  describe('testing when route resolved successfully', () => {
    const activatedRouteStub = { data: of({ chatData: [ [ {} as IMessage ], 'mockWatchChannel', 'mockPublishChannel' ] }) };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ ChatComponent ],
        imports: [ UtilityModule ],
        providers: [
          { provide: RxStompService, useValue: rxStompServiceStub },
          { provide: ActivatedRoute, useValue: activatedRouteStub }
        ]
      })
        .compileComponents();
    }));

    describe('empty watch channel', () => {
      beforeEach(() => rxStompServiceStub.watch.and.returnValue(EMPTY));

      beforeEach(() => {
        fixture = TestBed.createComponent(ChatComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });

      it('should initialize fields successfully', () => {
        expect(component.messages.length).toEqual(1);
        expect(component.username).toEqual('username');
        expect(component.resolverError).toEqual('');
        expect((component as any).watchChannel).toEqual('mockWatchChannel');
        expect((component as any).publishChannel).toEqual('mockPublishChannel');
      });

      it('should unsubscribe from chat subscription onDestroy', () => {
        const subscriptionSpy = spyOn((component as any).chatSubscription, 'unsubscribe');

        component.ngOnDestroy();

        expect(subscriptionSpy).toHaveBeenCalled();
      })

      it('should publish message on a channel and reset the message control', () => {
        component.messageFormControl.setValue('message');

        rxStompServiceStub.publish.and.returnValue();

        component.onMessageSend();

        const expectedBody = { message: 'message', sender: 'username' } as IMessage;

        expect(component.messageFormControl.value).toEqual('');
        expect(rxStompServiceStub.publish).toHaveBeenCalledWith({ destination: 'mockPublishChannel', body: JSON.stringify(expectedBody) });
      });
    });

    describe('receiving a value from watched channel', () => {
      const mockMessage = { message: 'message' } as IMessage;

      beforeEach(() => rxStompServiceStub.watch.and.returnValue(of({ body: JSON.stringify(mockMessage) })));

      beforeEach(() => {
        fixture = TestBed.createComponent(ChatComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should push message to the array of messages', () => {
        expect(component.messages.length).toEqual(2);
      });
    });
  });

  describe('testing when  route failed to resolve', () => {
    const activatedRouteStub = { data: throwError('Error') };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ ChatComponent ],
        imports: [ UtilityModule ],
        providers: [
          { provide: RxStompService, useValue: rxStompServiceStub },
          { provide: ActivatedRoute, useValue: activatedRouteStub }
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ChatComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should set an error message when route failed to resolve', () => {
      expect(component.messages.length).toEqual(0);
      expect(component.resolverError).toEqual('Error');
    });
  });
});
