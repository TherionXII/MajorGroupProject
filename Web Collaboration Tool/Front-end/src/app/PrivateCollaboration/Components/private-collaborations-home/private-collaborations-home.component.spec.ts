import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCollaborationsHomeComponent } from './private-collaborations-home.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';

describe('PrivateCollaborationsPageComponent', () => {
  let component: PrivateCollaborationsHomeComponent;
  let fixture: ComponentFixture<PrivateCollaborationsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateCollaborationsHomeComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateCollaborationsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
