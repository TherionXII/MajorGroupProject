import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperUploadComponent } from './paper-upload.component';

describe('PaperUploadComponent', () => {
  let component: PaperUploadComponent;
  let fixture: ComponentFixture<PaperUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
