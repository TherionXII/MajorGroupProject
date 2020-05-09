import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpComponent ],
      imports: [
        MatStepperModule,
        BrowserAnimationsModule
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger transition to the second part of the form when userCreatedEvent is triggered', () => {
    const localStorageSpy = spyOn(localStorage, 'setItem').and.callFake(() => { return; });
    const stepperSpy = spyOn((component as any).horizontalStepper, 'next');

    component.onUserCreated('username');

    expect(localStorageSpy).toHaveBeenCalledWith('username', 'username');
    expect(stepperSpy).toHaveBeenCalled();
  });
});
