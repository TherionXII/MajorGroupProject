import {async, ComponentFixture, ComponentFixtureAutoDetect, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';

import { ForumComponent } from './forum.component';
import {QueryFeatureModule} from '../query-feature.module';
import {QueryService} from '../services/query.service';
import {of, throwError} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {IQuery} from '../Interfaces/IQuery';
import {Router} from '@angular/router';
import {Type} from '@angular/core';

describe('ForumComponent', () => {
  let component: ForumComponent;
  let fixture: ComponentFixture<ForumComponent>;

  let queries: Array<IQuery>;

  const queryService = jasmine.createSpyObj('QueryService', [ 'getRecentQueries', 'createQuery' ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        QueryFeatureModule,
        RouterTestingModule
      ],
      providers: [
        { provide: QueryService, useValue: queryService },
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    })
    .compileComponents();
  });

  beforeEach( () => {
    let store = {};

    spyOn(localStorage, 'getItem').and.callFake((key) => store[key]);
    spyOn(localStorage, 'setItem').and.callFake( (key, value) => store[key] = value + '');
    spyOn(localStorage, 'clear').and.callFake(() => store = {});
  });

  beforeEach(() => {
    queries = [
      { id: 0, contents: '', rating: 0, title: '', subtitle: '', user: { username: 'username', password: '', email: ''} },
      { id: 1, contents: '', rating: 0, title: '', subtitle: '', user: { username: 'user', password: '', email: '' } }
    ];
  });

  afterEach(() => {
    queryService.getRecentQueries.calls.reset();
    queryService.createQuery.calls.reset();
  });


  it('should create', () => {
    queryService.getRecentQueries.and.returnValue(of(queries));

    fixture = TestBed.createComponent(ForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('query creation form should be available when username is in session', () => {
    localStorage.setItem('username', 'username');
    queryService.getRecentQueries.and.returnValue(of(queries));

    fixture = TestBed.createComponent(ForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.isCreateVisible).toBeTrue();
  });

  it('query creation form should not be available when username is not in session',() => {
    localStorage.clear();
    queryService.getRecentQueries.and.returnValue(of(queries));

    fixture = TestBed.createComponent(ForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.isCreateVisible).toBeFalse();
    fixture.destroy();
  });

  it('should retrieve queries and assign them to the array of queries', () => {
    queryService.getRecentQueries.and.returnValue(of(queries));

    fixture = TestBed.createComponent(ForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.queries.length).toEqual(2);
    expect(component.queries[0]).toEqual(queries[0]);
    expect(component.queries[1]).toEqual(queries[1]);
  });

  it('should set the error message when failed to retrieve queries',() => {
    queryService.getRecentQueries.and.returnValue(throwError({ message: 'error' }));

    fixture = TestBed.createComponent(ForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.queries).toEqual([]);
    expect(component.queries.length).toBe(0);
    expect(component.getQueriesError).toEqual('error');
  });

  it('should have a valid form when input is valid', () => {
    localStorage.setItem('username', 'username');

    queryService.getRecentQueries.and.returnValue(throwError({ message: 'error' }));

    fixture = TestBed.createComponent(ForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.queryFormGroup.get('title').setValue('title');
    component.queryFormGroup.get('subtitle').setValue('subtitle');
    component.queryFormGroup.get('contents').setValue('contents');

    expect(component.queryFormGroup.valid).toBeTrue();
  });

  it('should have an invalid form when inputs are invalid', () => {
    localStorage.setItem('username', 'username');

    queryService.getRecentQueries.and.returnValue(throwError({ message: 'error' }));

    fixture = TestBed.createComponent(ForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.queryFormGroup.get('title').setValue('');
    component.queryFormGroup.get('subtitle').setValue('');
    component.queryFormGroup.get('contents').setValue('');

    expect(component.queryFormGroup.valid).toBeFalse();
  });

  it('should redirect to the query page when successfully created a new query', () => {
    localStorage.setItem('username', 'username');

    queryService.getRecentQueries.and.returnValue(throwError({ message: 'error' }));

    fixture = TestBed.createComponent(ForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.queryFormGroup.get('title').setValue('title');
    component.queryFormGroup.get('subtitle').setValue('subtitle');
    component.queryFormGroup.get('contents').setValue('contents');

    const createQuerySpy = queryService.createQuery.and.returnValue(of({ id: 1 }));
    const router = TestBed.inject(Router as Type<Router>);
    const routerSpy = spyOn(router, 'navigateByUrl');

    component.onSubmit();

    expect(createQuerySpy).toHaveBeenCalledWith(component.queryFormGroup.getRawValue() as IQuery, 'username');
    expect(routerSpy).toHaveBeenCalledWith('/query/1');
  });

  it('should set the error message when failed to create a query', () => {
    localStorage.setItem('username', 'username');

    queryService.getRecentQueries.and.returnValue(throwError({ message: 'error' }));

    fixture = TestBed.createComponent(ForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.queryFormGroup.get('title').setValue('title');
    component.queryFormGroup.get('subtitle').setValue('subtitle');
    component.queryFormGroup.get('contents').setValue('contents');

    const createQuerySpy = queryService.createQuery.and.returnValue(throwError({ message: 'error' }));
    const router = TestBed.inject(Router as Type<Router>);
    const routerSpy = spyOn(router, 'navigateByUrl');

    component.onSubmit();

    expect(createQuerySpy).toHaveBeenCalledWith(component.queryFormGroup.getRawValue() as IQuery, 'username');
    expect(routerSpy).not.toHaveBeenCalled();
    expect(component.createQueryError).toEqual('error');
  });
});
