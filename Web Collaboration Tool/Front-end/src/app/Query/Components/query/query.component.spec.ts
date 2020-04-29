import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryComponent } from './query.component';
import {QueryModule} from '../../query.module';
import {QueryService} from '../../Services/query.service';
import {RouterTestingModule} from '@angular/router/testing';
import {IQuery} from '../../Interfaces/IQuery';
import {ActivatedRoute} from '@angular/router';
import {of, throwError} from 'rxjs';
import {Type} from '@angular/core';

describe('QueryComponent', () => {
  let component: QueryComponent;
  let fixture: ComponentFixture<QueryComponent>;

  let query: IQuery;

  const queryService = jasmine.createSpyObj('QueryService', [ 'getQueryById' ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        QueryModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [ { provide: QueryService, useValue: queryService } ]
    })
    .compileComponents();
  }));

  beforeEach(() => query = {
    title: 'title',
    subtitle: 'subtitle',
    rating: 0,
    contents: 'contents',
    user: {
      username: 'username',
      password: '',
      email: ''
    }
  });

  it('should create', () => {
    queryService.getQueryById.and.returnValue(of(query));
    spyOn(TestBed.inject(ActivatedRoute as Type<ActivatedRoute>).snapshot.paramMap, 'get').and.returnValue('1');

    fixture = TestBed.createComponent(QueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should retrieve a query with the given id and assign it to query', () => {
    const getQueryByIdSpy = queryService.getQueryById.and.returnValue(of(query));
    const getSpy = spyOn(TestBed.inject(ActivatedRoute as Type<ActivatedRoute>).snapshot.paramMap, 'get').and.returnValue('1');

    fixture = TestBed.createComponent(QueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(getSpy).toHaveBeenCalledWith('id');
    expect(getQueryByIdSpy).toHaveBeenCalledWith('1');
    expect(component.query).toEqual(query);
  });

  it('should set an error message when failed to retrieve a query with a given id', () => {
    const getQueryByIdSpy = queryService.getQueryById.and.returnValue(throwError({ message: 'error' }));
    const getSpy = spyOn(TestBed.inject(ActivatedRoute as Type<ActivatedRoute>).snapshot.paramMap, 'get').and.returnValue('1');

    fixture = TestBed.createComponent(QueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(getSpy).toHaveBeenCalledWith('id');
    expect(getQueryByIdSpy).toHaveBeenCalledWith('1');
    expect(component.query).toEqual(undefined);
    expect(component.getQueryError).toEqual('error');
  });
});
