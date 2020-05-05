import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperCreationComponent } from './paper-creation.component';
import {RouterTestingModule} from '@angular/router/testing';
import {PaperModule} from '../../paper.module';
import {PaperService} from '../../Services/paper.service';
import {ActivatedRoute} from '@angular/router';
import {of, throwError} from 'rxjs';
import {IPaper} from '../../Interfaces/IPaper';

describe('CreatePaperComponent', () => {
  let component: PaperCreationComponent;
  let fixture: ComponentFixture<PaperCreationComponent>;

  const activatedRouteStub = { snapshot: { paramMap: { get: (key: string) => '0' } } }
  const paperServiceStub = jasmine.createSpyObj('PaperService', [ 'createPaper' ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperCreationComponent ],
      imports: [
        PaperModule,
        RouterTestingModule
      ],
      providers: [
        { provide: PaperService, useValue: paperServiceStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize fields successfully', () => {
    expect(component.newPaperForm).not.toBeUndefined();
    expect(component.createPaperError).toEqual('');
    expect(component.paperCreatedEvent).not.toBeUndefined();
  });

  it('should emit an event when created a new paper successfully', () => {
    component.newPaperForm.get('paperName').setValue('paperName');
    component.newPaperForm.get('paperDescription').setValue('paperDescription');

    paperServiceStub.createPaper.and.returnValue(of({} as IPaper));
    spyOn(component.paperCreatedEvent, 'emit');

    component.onSubmit();

    expect(paperServiceStub.createPaper).toHaveBeenCalledWith('0', component.newPaperForm.getRawValue() as IPaper);
    expect(component.paperCreatedEvent.emit).toHaveBeenCalledWith({} as IPaper);
  });

  it('should set an error message when failed to create a new paper', () => {
    component.newPaperForm.get('paperName').setValue('paperName');
    component.newPaperForm.get('paperDescription').setValue('paperDescription');

    paperServiceStub.createPaper.and.returnValue(throwError('Error'));
    spyOn(component.paperCreatedEvent, 'emit');

    component.onSubmit();

    expect(paperServiceStub.createPaper).toHaveBeenCalledWith('0', component.newPaperForm.getRawValue() as IPaper)
    expect(component.paperCreatedEvent.emit).not.toHaveBeenCalledWith({} as IPaper);
    expect(component.createPaperError).toEqual('Error');
  });
});
