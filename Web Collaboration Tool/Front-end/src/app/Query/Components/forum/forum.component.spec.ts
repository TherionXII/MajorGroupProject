import {ComponentFixture, TestBed} from '@angular/core/testing';

import { ForumComponent } from './forum.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';

describe('ForumComponent', () => {
  let component: ForumComponent;
  let fixture: ComponentFixture<ForumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumComponent ],
      schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  describe(' testing when username is in local storage', () => {
    beforeEach(() => spyOn(localStorage, 'getItem').and.returnValue('username'));

    beforeEach(() => {
      fixture = TestBed.createComponent(ForumComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should set isCreateVisible as true', () => expect(component.isCreateVisible).toBeTrue());
  });

  describe(' testing when username is absent from the local storage', () => {
    beforeEach(() => spyOn(localStorage, 'getItem').and.returnValue(null));

    beforeEach(() => {
      fixture = TestBed.createComponent(ForumComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should set isCreateVisible as false', () => expect(component.isCreateVisible).toBeFalse());
  })
});
