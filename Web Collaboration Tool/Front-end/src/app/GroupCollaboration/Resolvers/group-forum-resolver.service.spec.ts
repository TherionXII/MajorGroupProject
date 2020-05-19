import { TestBed } from '@angular/core/testing';

import { GroupForumResolverService } from './group-forum-resolver.service';
import {RouterTestingModule} from '@angular/router/testing';
import {QueryService} from '../../Query/Services/query.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IQuery} from '../../Query/Interfaces/IQuery';
import {of, throwError} from 'rxjs';

describe('GroupForumResolverService', () => {
  let service: GroupForumResolverService;

  const queryServiceStub = jasmine.createSpyObj('QueryService', [ 'getRecentGroupQueries' ]);

  const mockQueries = [ {} as IQuery, {} as IQuery ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [ { provide: QueryService, useValue: queryServiceStub }]
    });
    service = TestBed.inject(GroupForumResolverService);
  });

  beforeEach(() => spyOn(TestBed.inject(ActivatedRoute).snapshot.paramMap, 'get').and.returnValue('0'));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return queries and a boolean value of false', () => {
    queryServiceStub.getRecentGroupQueries.and.returnValue(of(mockQueries));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(forumData => {
        expect(queryServiceStub.getRecentGroupQueries).toHaveBeenCalledWith('0');
        expect(forumData[0]).toEqual(mockQueries);
        expect(forumData[1]).toBeFalse();
      }, () => fail('Should have succeeded!'));
  });

  it('should return an error message when failed to retrieve queries', () => {
    queryServiceStub.getRecentGroupQueries.and.returnValue(throwError('Error'));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(() => fail('Should have failed!'), error => {
        expect(queryServiceStub.getRecentGroupQueries).toHaveBeenCalledWith('0');
        expect(error).toEqual('Failed to retrieve forum data; please try again later');
      });
  });
});
