import { TestBed } from '@angular/core/testing';

import { QueryResolverService } from './query-resolver.service';
import {IQuery} from '../Interfaces/IQuery';
import {RouterTestingModule} from '@angular/router/testing';
import {QueryService} from '../Services/query.service';
import {of, throwError} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

describe('QueryResolverService', () => {
  let service: QueryResolverService;

  const queryServiceStub = jasmine.createSpyObj('QueryService', [ 'getQueryById' ]);
  const mockQuery = { id: 0 } as IQuery;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [ { provide: QueryService, useValue: queryServiceStub } ]
    });
    service = TestBed.inject(QueryResolverService);
  });

  beforeEach(() => spyOn(TestBed.inject(ActivatedRoute).snapshot.paramMap, 'get').and.returnValue('0'));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a query with the give id when request succeeded', () => {
    queryServiceStub.getQueryById.and.returnValue(of(mockQuery));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(query => {
        expect(queryServiceStub.getQueryById).toHaveBeenCalledWith('0');
        expect(query.id).toEqual(mockQuery.id);
      }, () => fail('Should have succeeded!'));
  });

  it('should return an error when failed to retrieve a query', () => {
    queryServiceStub.getQueryById.and.returnValue(throwError('Error'));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(() => fail('Should have failed!'),
                 error => expect(error).toEqual('Failed to retrieve query data; please try again later'));
  });
});
