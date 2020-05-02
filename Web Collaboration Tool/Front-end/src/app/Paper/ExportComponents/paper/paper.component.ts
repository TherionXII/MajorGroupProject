import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IPaper} from '../../Interfaces/IPaper';
import {RxStompService} from '@stomp/ng2-stompjs';
import {IPaperQuestion} from '../../Interfaces/IPaperQuestion';
import {FormArray, FormControl} from '@angular/forms';
import {EMPTY, Subscription} from 'rxjs';
import {defaultIfEmpty, first} from 'rxjs/operators';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})
export class PaperComponent implements OnInit, OnDestroy {
  public paper: IPaper;
  public questionsForm: FormArray;

  public resolverError: string;

  private questionsToControls: Map<IPaperQuestion, FormControl>;

  private updateQuestionChannelSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private rxStompService: RxStompService) {
    this.paper = {} as IPaper;
    this.questionsForm = new FormArray([]);

    this.resolverError = '';

    this.questionsToControls = new Map<IPaperQuestion, FormControl>();
  }

  public ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: { paper: IPaper} ) => {
      this.paper = data.paper;

      this.prepareFormControls();

      this.updateQuestionChannelSubscription = this.rxStompService.watch(`/topic/papers/updateAnswer/${this.paper.id}`)
        .subscribe(update => this.onUpdate(JSON.parse(update.body)));
    }, error => this.resolverError = error);
  }

  public ngOnDestroy(): void {
    this.updateQuestionChannelSubscription.unsubscribe();
  }

  public onChange(answer: string, questionIndex: number): void {
    if(!answer.endsWith(' ')) return;

    const changedQuestion = this.paper.questions[questionIndex];
    changedQuestion.answer = answer;
    this.rxStompService.publish({ destination: `/app/papers/updateAnswer/${this.paper.id}`, body: JSON.stringify(changedQuestion) });
  }

  private onUpdate(updatedQuestion: IPaperQuestion): void {
    const questionToUpdate = this.paper.questions.find(question => question.id === updatedQuestion.id);
    questionToUpdate.answer = updatedQuestion.answer;

    this.questionsToControls.get(questionToUpdate).patchValue(updatedQuestion.answer);
  }

  private prepareFormControls(): void {
    for (const question of this.paper.questions) {
      const questionControl = new FormControl(question.answer);
      this.questionsToControls.set(question, questionControl);
      this.questionsForm.push(questionControl);
    }
  }
}
