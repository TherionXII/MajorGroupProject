import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { PaperComponent } from './paper.component';
import {PaperModule} from '../../paper.module';
import {RouterTestingModule} from '@angular/router/testing';
import {IPaper} from '../../Interfaces/IPaper';
import {IPaperQuestion} from '../../Interfaces/IPaperQuestion';
import {EMPTY, of, throwError} from 'rxjs';
import {RxStompService} from '@stomp/ng2-stompjs';
import {ActivatedRoute} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


describe('PaperComponent', () => {
  let component: PaperComponent;
  let fixture: ComponentFixture<PaperComponent>;

  const rxStompServiceStub = jasmine.createSpyObj('RxStompService', [ 'watch', 'publish' ]);

  describe('testing when route resolved successfully', () => {
    const mockPaper = { id: 0, questions: [ { id: 0, text: 'question text'} as IPaperQuestion ] } as IPaper;
    const activatedRouteStub = { data: of({ paper: mockPaper } )};

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ PaperComponent ],
        imports: [
          PaperModule,
          RouterTestingModule,
          BrowserAnimationsModule
        ],
        providers: [
          { provide: RxStompService, useValue: rxStompServiceStub },
          { provide: ActivatedRoute, useValue: activatedRouteStub }
        ]
      })
        .compileComponents();
    }));

    describe('testing when not receiving updates via the socket channel', () => {
      beforeEach(() => {
        rxStompServiceStub.watch.and.returnValue(EMPTY);

        fixture = TestBed.createComponent(PaperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });

      it('should initialize the fields properly', () => {
        expect(component.paper).toEqual(mockPaper);
        expect(component.questionsForm.length).toEqual(1);
        expect(component.resolverError).toEqual('');
      });

      it('should unsubscribe from the channel when component is destroyed', () => {
        const subscriptionSpy = spyOn((component as any).updateQuestionChannelSubscription, 'unsubscribe');

        component.ngOnDestroy();

        expect(subscriptionSpy).toHaveBeenCalled();
      });

      it('should return if the answer does not end with a whitespace', () => {
        component.onChange('answer', 0);

        expect(rxStompServiceStub.publish).not.toHaveBeenCalled();
      });

      it('should update question with the specified index and publish it on the socket channel', () => {
        rxStompServiceStub.publish.and.returnValue();

        component.onChange('answer ', 0);

        const changedQuestion = component.paper.questions[0];
        const destinationChannel = `/app/papers/updateAnswer/${component.paper.id}`;

        expect(changedQuestion.answer).toEqual('answer ');
        expect(rxStompServiceStub.publish).toHaveBeenCalledWith({ destination: destinationChannel, body: JSON.stringify(changedQuestion) })
      });

      it('should unsubscribe from the channel on destroy', () => {
        const subscriptionSpy = spyOn((component as any).updateQuestionChannelSubscription, 'unsubscribe');

        component.ngOnDestroy();

        expect(subscriptionSpy).toHaveBeenCalled();
      })
    })

    describe(' testing when receiving updates via the channel', () => {
      const changedQuestion = {
        id: 0,
        answer:'Answer '
      } as IPaperQuestion;

      beforeEach(() => {
        rxStompServiceStub.watch.and.returnValue(of({ body: JSON.stringify(changedQuestion) }));

        fixture = TestBed.createComponent(PaperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should update question when received an update from the socket channel', () => {
        expect(component.paper.questions[0].answer).toEqual(changedQuestion.answer);
      });
    });
  });

  describe(' testing when route failed to resolve', () => {
    const activatedRouteStub = { data: throwError('Error') };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ PaperComponent ],
        imports: [
          PaperModule,
          RouterTestingModule,
          BrowserAnimationsModule
        ],
        providers: [
          { provide: RxStompService, useValue: rxStompServiceStub },
          { provide: ActivatedRoute, useValue: activatedRouteStub }
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(PaperComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should set the error message and default-initialize the fields', () => {
      expect(component.paper).toEqual({} as IPaper);
      expect(component.questionsForm.length).toEqual(0);
      expect(component.resolverError).toEqual('Error');
    });
  });
});
