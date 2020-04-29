import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperCreationComponent } from './paper-creation.component';

describe('CreatePaperComponent', () => {
  let component: PaperCreationComponent;
  let fixture: ComponentFixture<PaperCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperCreationComponent ]
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
});
