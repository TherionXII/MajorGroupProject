import {TestBed} from '@angular/core/testing';

import {UserDataResolverService} from './user-data-resolver.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute, Router} from '@angular/router';
import {of, throwError} from 'rxjs';
import {QueryService} from '../../Query/Services/query.service';
import {IQuery} from '../../Query/Interfaces/IQuery';

describe('UserDataResolverService', () => {
  let service: UserDataResolverService;

  const queryServiceStub = jasmine.createSpyObj('QueryService', [ 'getRecentQueriesForUser', 'getRecentResponsesForUser' ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [ { provide: QueryService, useValue: queryServiceStub } ]
    });
    service = TestBed.inject(UserDataResolverService);
  });

  beforeEach(() => {
    spyOn(TestBed.inject(ActivatedRoute).snapshot.paramMap, 'get').and.returnValue('username');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user queries', () => {
    queryServiceStub.getRecentQueriesForUser.and.returnValue(of([ {} as IQuery, {} as IQuery ]));
    queryServiceStub.getRecentResponsesForUser.and.returnValue(of([ {} as IQuery, {} as IQuery ]));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(userData => {
        expect(queryServiceStub.getRecentQueriesForUser).toHaveBeenCalledWith('username');
        expect(queryServiceStub.getRecentResponsesForUser).toHaveBeenCalledWith('username');

        expect(userData[0].length).toEqual(2);
        expect(userData[1].length).toEqual(2);
      }, () => fail('Should have succeeded!'));
  });

  it('should return an error when getRecentQueriesForUser call has failed', () => {
    queryServiceStub.getRecentQueriesForUser.and.returnValue(throwError('Error'));
    queryServiceStub.getRecentResponsesForUser.and.returnValue(of([ {} as IQuery, {} as IQuery ]));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(() => fail('Should have failed!'), error => {
        expect(queryServiceStub.getRecentQueriesForUser).toHaveBeenCalledWith('username');
        expect(queryServiceStub.getRecentResponsesForUser).toHaveBeenCalledWith('username');

        expect(error).toEqual('Failed to retrieve user data; please try again later');
      });
  });

  it('should return an error when getRecentResponsesForUser call has failed', () => {
    queryServiceStub.getRecentQueriesForUser.and.returnValue(of([ {} as IQuery, {} as IQuery ]));
    queryServiceStub.getRecentResponsesForUser.and.returnValue(throwError('Error'));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(() => fail('Should have failed!'), error => {
        expect(queryServiceStub.getRecentQueriesForUser).toHaveBeenCalledWith('username');
        expect(queryServiceStub.getRecentResponsesForUser).toHaveBeenCalledWith('username');

        expect(error).toEqual('Failed to retrieve user data; please try again later');
      });
  });
});
