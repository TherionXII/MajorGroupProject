import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { UserComponent } from './user.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {of} from 'rxjs';

describe('UserPageComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  const activatedRouteStub = { paramMap: of( { get: (key: string) => 'username'} )};

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      imports: [ RouterTestingModule ],
      providers: [ { provide: ActivatedRoute, useValue: activatedRouteStub } ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should set the username', () => {
    expect(component.username).toEqual('username');
  })
});
