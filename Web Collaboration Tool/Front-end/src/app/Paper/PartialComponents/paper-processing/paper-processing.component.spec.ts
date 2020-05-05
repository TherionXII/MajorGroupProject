import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperProcessingComponent } from './paper-processing.component';
import {PaperModule} from '../../paper.module';
import {PaperService} from '../../Services/paper.service';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {IPaper} from '../../Interfaces/IPaper';
import {IPage} from '../../Interfaces/IPage';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {IPosition} from '../../Interfaces/IPosition';
import {IPaperQuestion} from '../../Interfaces/IPaperQuestion';
import {of, throwError} from 'rxjs';

describe('PaperProcessingComponent', () => {
  let component: PaperProcessingComponent;
  let fixture: ComponentFixture<PaperProcessingComponent>;

  const paperServiceStub = jasmine.createSpyObj('paperService', [ 'processQuestion' ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperProcessingComponent ],
      imports: [ PaperModule, RouterTestingModule ],
      providers: [ { provide: PaperService, useValue: paperServiceStub }],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize components successfully', () => {
    expect(component.processedPaperQuestions.length).toEqual(0);
    expect(component.paper).toEqual({} as IPaper);
    expect(component.currentQuestion).toEqual({} as IPaperQuestion);
    expect(component.isSelectingText).toBeTrue();
    expect(component.processingError).toEqual('');
  });

  it('should update the paper when onPaperCreationEvent is triggered', () => {
    component.onPaperCreation({ id: 0 } as IPaper);

    expect(component.paper.id).toEqual(0);
  });

  it('should update the paper pages when onPaperUploadEvent is triggered', () => {
    const stepperSpy = spyOn(component.horizontalStepper, 'next');

    component.onPaperCreation({ id: 0 } as IPaper);
    component.onPaperUpload([ { id: 0 } as IPage, { id: 1 } as IPage ]);

    expect(component.paper.pages.length).toEqual(2);
    expect(component.currentPage.id).toEqual(0);
    expect(stepperSpy).toHaveBeenCalled();
  });

  describe(' testing uploaded paper processing', () => {
    beforeEach(() => {
      component.onPaperCreation({ id: 0 } as IPaper);
      component.onPaperUpload([ { id: 0 } as IPage, { id: 1 } as IPage ]);
    });

    it('should change the current page when tab is changed', () => {
      component.onPageChange({ index: 1 } as MatTabChangeEvent);

      expect(component.currentPage.id).toEqual(1);
    });

    it('should change the selection type to the opposite when triggered', () => {
      component.onSelectionTypeChange();
      expect(component.isSelectingText).toBeFalse();

      component.onSelectionTypeChange();
      expect(component.isSelectingText).toBeTrue();
    });

    it('should update question position when onCrop event is triggered', () => {
      component.onCrop({ imagePosition: { x1: 0, x2: 10, y1: 0, y2: 10 } } as ImageCroppedEvent, 0);

      expect(component.currentQuestion.questionPosition).toEqual({ x1: 0, x2: 10, y1: 0, y2: 10 } as IPosition);
      expect(component.currentQuestion.pageNumber).toEqual(0);
    });

    it('should update question image when onCrop event is triggered and is selecting an image', () => {
      component.onSelectionTypeChange();

      component.onCrop({ imagePosition: { x1: 0, x2: 10, y1: 0, y2: 10 }, base64: 'base64String' } as ImageCroppedEvent, 0);

      expect(component.currentQuestion.questionImage.imagePosition).toEqual({ x1: 0, x2: 10, y1: 0, y2: 10 } as IPosition);
      expect(component.currentQuestion.questionImage.image).toEqual('base64String');
    });

    it('should send the current question for processing, add it to the list when finished and reset the current question', () =>{
      component.onCrop({ imagePosition: { x1: 0, x2: 10, y1: 0, y2: 10 } } as ImageCroppedEvent, 0);
      const expectedQuestion = component.currentQuestion;

      paperServiceStub.processQuestion.and.returnValue(of({ id: 1 } as IPaperQuestion));

      component.onNextQuestion();

      expect(paperServiceStub.processQuestion).toHaveBeenCalledWith(component.paper.id, expectedQuestion);
      expect(component.processedPaperQuestions.length).toBe(1);
      expect(component.processedPaperQuestions.find(question => question.id === 1)).not.toBeUndefined();
      expect(component.currentQuestion).toEqual({} as IPaperQuestion);
    })

    it('should set the error when failed to process the question', () => {
      component.onCrop({ imagePosition: { x1: 0, x2: 10, y1: 0, y2: 10 } } as ImageCroppedEvent, 0);
      const expectedQuestion = component.currentQuestion;

      paperServiceStub.processQuestion.and.returnValue(throwError('Error'));

      component.onNextQuestion();

      expect(paperServiceStub.processQuestion).toHaveBeenCalledWith(component.paper.id, expectedQuestion);
      expect(component.processedPaperQuestions.length).toBe(0);
      expect(component.processedPaperQuestions.find(question => question.id === 1)).toBeUndefined();
      expect(component.currentQuestion).toEqual({} as IPaperQuestion);
      expect(component.processingError).toEqual('Failed to process your question; please try again later');
    });
  });
});
