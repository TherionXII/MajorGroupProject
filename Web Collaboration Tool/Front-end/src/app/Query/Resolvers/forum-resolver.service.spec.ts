import { TestBed } from '@angular/core/testing';

import { ForumResolverService } from './forum-resolver.service';
import {RouterTestingModule} from '@angular/router/testing';
import {QueryService} from '../Services/query.service';
import {of, throwError} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {IQuery} from '../Interfaces/IQuery';

describe('ForumResolverService', () => {
  let service: ForumResolverService;

  const queryServiceStub = jasmine.createSpyObj('QueryService', [ 'getRecentPublicQueries' ]);

  const mockQueries = [ {} as IQuery, {} as IQuery ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [ { provide: QueryService, useValue: queryServiceStub }]
    });
    service = TestBed.inject(ForumResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return queries and a boolean value of false', () => {
    queryServiceStub.getRecentPublicQueries.and.returnValue(of(mockQueries));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(forumData => {
        expect(queryServiceStub.getRecentPublicQueries).toHaveBeenCalled();
        expect(forumData[0]).toEqual(mockQueries);
        expect(forumData[1]).toBeTrue();
      }, () => fail('Should have succeeded!'));
  });

  it('should return an error message when failed to retrieve queries', () => {
    queryServiceStub.getRecentPublicQueries.and.returnValue(throwError('Error'));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(() => fail('Should have failed!'), error => {
        expect(queryServiceStub.getRecentPublicQueries).toHaveBeenCalled();
        expect(error).toEqual('Failed to retrieve forum data; please try again later');
      });
  });
});
