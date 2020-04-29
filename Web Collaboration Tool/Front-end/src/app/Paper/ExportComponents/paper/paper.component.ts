import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IPaper} from '../../Interfaces/IPaper';
import {RxStompService} from '@stomp/ng2-stompjs';
import {IPaperQuestion} from '../../Interfaces/IPaperQuestion';
import {FormArray, FormControl} from '@angular/forms';
import {timer} from 'rxjs';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})
export class PaperComponent implements OnInit {
  public paper: IPaper;
  public questionsForm: FormArray;

  private questionsToControls: Map<IPaperQuestion, FormControl>;

  constructor(private activatedRoute: ActivatedRoute, private rxStompService: RxStompService) {
    this.questionsForm = new FormArray([]);
    this.questionsToControls = new Map<IPaperQuestion, FormControl>();
  }

  public ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: { paper: IPaper} ) => this.paper = data.paper);

    for(const question of this.paper.questions) {
      const questionControl = new FormControl(question.answer);
      this.questionsToControls.set(question, questionControl);
      this.questionsForm.push(questionControl);
    }

    this.rxStompService.watch(`/topic/papers/updateAnswer/${this.paper.id}`)
      .subscribe(update => this.onUpdate(JSON.parse(update.body)));
  }

  public onChange(answer: string, questionIndex: number): void {
    if(!answer.endsWith(' ')) return;

    const changedQuestion = this.paper.questions[questionIndex];
    changedQuestion.answer = answer;
    this.rxStompService.publish({ destination: `/app/papers/updateAnswer/${this.paper.id}`, body: JSON.stringify(changedQuestion) });
  }

  public onUpdate(updatedQuestion: IPaperQuestion): void {
    const questionToUpdate = this.paper.questions.find(question => question.id === updatedQuestion.id);
    questionToUpdate.answer = updatedQuestion.answer;

    this.questionsToControls.get(questionToUpdate).patchValue(updatedQuestion.answer);
  }
}
