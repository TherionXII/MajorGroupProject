import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCollaborationsPageComponent } from './private-collaborations-page.component';

describe('PrivateCollaborationsPageComponent', () => {
  let component: PrivateCollaborationsPageComponent;
  let fixture: ComponentFixture<PrivateCollaborationsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateCollaborationsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateCollaborationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
