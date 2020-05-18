import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {Type} from '@angular/core';
import {AppComponent} from './app.component';
import {AppModule} from './app.module';

describe('componentComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach( () => {
    let store = {};

    spyOn(localStorage, 'getItem').and.callFake((key) => store[key]);
    spyOn(localStorage, 'setItem').and.callFake( (key, value) => store[key] = value + '');
    spyOn(localStorage, 'clear').and.callFake(() => store = {});
    spyOn(localStorage, 'removeItem').and.callFake(() => store = {});

    localStorage.setItem('username', 'username');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Front-end'`, () => {
    expect(component.title).toEqual('Front-end');
  });

  it('should return a username or a null when invoked getUsername()', () => {
    localStorage.setItem('username', 'username');

    let result = component.getUsername();
    expect(result).toEqual('username');

    localStorage.clear();

    result = component.getUsername();
    expect(result).toBeUndefined();
  });

  it('should clear local storage and redirect to logout page when logged out', () => {
    const navigateByUrlSpy = spyOn(TestBed.inject(Router as Type<Router>), 'navigateByUrl');

    component.logout();
    expect(navigateByUrlSpy).toHaveBeenCalledWith('/');
    expect(localStorage.getItem('username')).toBeUndefined();
  })
});
