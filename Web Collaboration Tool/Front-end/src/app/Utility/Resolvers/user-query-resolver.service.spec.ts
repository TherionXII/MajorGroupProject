import { TestBed } from '@angular/core/testing';

import { UserQueryResolverService } from './user-query-resolver.service';
import {RouterTestingModule} from '@angular/router/testing';
import {QueryService} from '../../query-feature/services/query.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Type} from '@angular/core';
import {of} from 'rxjs';
import {IQuery} from '../../query-feature/Interfaces/IQuery';

describe('UserQueryResolverService', () => {
  let service: UserQueryResolverService;

  const queryService = jasmine.createSpyObj('QueryService', [ 'getRecentQueriesForUser' ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]) ],
      providers: [ { provide: QueryService, useValue: queryService }]
    });
    service = TestBed.inject(UserQueryResolverService);
  });

  beforeEach( () => {
    let store = {};

    spyOn(localStorage, 'getItem').and.callFake((key) => store[key]);
    spyOn(localStorage, 'setItem').and.callFake( (key, value) => store[key] = value + '');
    spyOn(localStorage, 'clear').and.callFake(() => store = {});
  });

  beforeEach(() => {
    spyOn(TestBed.inject(ActivatedRoute as Type<ActivatedRoute>).snapshot.paramMap, 'get').and.returnValue('username');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return queries after successful API call', () => {
    const getRecentQueriesSpy = queryService.getRecentQueriesForUser.and.returnValue(of([{} as IQuery, {} as IQuery]));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
           .subscribe((queries: Array<IQuery>) => {
             expect(getRecentQueriesSpy).toHaveBeenCalled();
             expect(queries.length).toEqual(2);
           }, () => fail('Should have succeeded'));
  });

  it('should return to the user page when username in local storage is different from the username in url', () => {
    localStorage.setItem('username', 'user');

    queryService.getRecentQueriesForUser.and.returnValue(of(undefined));
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot).subscribe();

    expect(navigateSpy).toHaveBeenCalledWith([ `/user/${localStorage.getItem('username')}`]);
  });

  it('should return to the home page when user in local storage is same as the username in url', () => {
    localStorage.setItem('username', 'username');

    queryService.getRecentQueriesForUser.and.returnValue(of(undefined));
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot).subscribe();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});
