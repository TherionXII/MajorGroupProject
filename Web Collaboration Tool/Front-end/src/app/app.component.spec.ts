import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {AppModule} from './app.module';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {Type} from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach( () => {
    let store = {};

    spyOn(localStorage, 'getItem').and.callFake((key) => store[key]);
    spyOn(localStorage, 'setItem').and.callFake( (key, value) => store[key] = value + '');
    spyOn(localStorage, 'clear').and.callFake(() => store = {});

    localStorage.setItem('username', 'username');
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Front-end'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Front-end');
  });

  it('should clear local storage and redirect to logout page when logged out', () => {
    const navigateByUrlSpy = spyOn(TestBed.inject(Router as Type<Router>), 'navigateByUrl');

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    app.logout();
    expect(navigateByUrlSpy).toHaveBeenCalledWith('/');
    expect(localStorage.getItem('username')).toBeNull();
  })
});
