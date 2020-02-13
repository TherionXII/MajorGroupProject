import { TestBed } from '@angular/core/testing';

import { QueryService } from './query.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Type} from '@angular/core';
import {IQuery} from '../Interfaces/IQuery';
import {IQueryVote} from '../Interfaces/IQueryVote';

describe('QueryService', () => {
  let queryService: QueryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [QueryService]
  }));

  beforeEach(() => {
      queryService = TestBed.inject(QueryService as Type<QueryService>);
      httpTestingController = TestBed.inject(HttpTestingController as Type<HttpTestingController>);
  });

  it('should be created', () => {
    expect(queryService).toBeTruthy();
  });

  it('should send a successful request to get recent queries', () => {
    queryService.getRecentQueries()
                .subscribe(response => expect(response.length).toEqual(2), () => fail('Should not have failed!'));

    const request = httpTestingController.expectOne('http://localhost:8080/getRecentQueries');
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual('http://localhost:8080/getRecentQueries');

    request.flush(new Array<IQuery>({} as IQuery, {} as IQuery));
  });

  it('should send an unsuccessful request to get recent queries', () => {
    queryService.getRecentQueries()
                .subscribe(() => fail('Should have failed'), error => expect(error.error).toEqual('error'));

    const request = httpTestingController.expectOne('http://localhost:8080/getRecentQueries');
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual('http://localhost:8080/getRecentQueries');

    request.flush('error', { status: 401, statusText: 'error' });
  });

  it('should send a successful request to get recent queries', () => {
    queryService.getRecentQueriesForUser('username')
                .subscribe(response => expect(response.length).toEqual(2), () => fail('Should not have failed!'));

    const request = httpTestingController.expectOne('http://localhost:8080/username/getRecentQueries');
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual('http://localhost:8080/username/getRecentQueries');

    request.flush(new Array<IQuery>({} as IQuery, {} as IQuery));
  });

  it('should send an unsuccessful request to get recent queries', () => {
    queryService.getRecentQueriesForUser('username')
                .subscribe(() => fail('Should have failed'), error => expect(error.error).toEqual('error'));

    const request = httpTestingController.expectOne('http://localhost:8080/username/getRecentQueries');
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual('http://localhost:8080/username/getRecentQueries');

    request.flush('error', { status: 401, statusText: 'error' });
  });

  it('should send a successful request to get recent responses', () => {
    queryService.getRecentResponsesForUser('username')
                .subscribe(response => expect(response.length).toEqual(2), () => fail('Should not have failed!'));

    const request = httpTestingController.expectOne('http://localhost:8080/username/getRecentResponses');
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual('http://localhost:8080/username/getRecentResponses');

    request.flush(new Array<IQuery>({} as IQuery, {} as IQuery));
  });

  it('should send an unsuccessful request to get recent responses', () => {
    queryService.getRecentResponsesForUser('username')
                .subscribe(() => fail('Should have failed'), error => expect(error.error).toEqual('error'));

    const request = httpTestingController.expectOne('http://localhost:8080/username/getRecentResponses');
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual('http://localhost:8080/username/getRecentResponses');

    request.flush('error', { status: 401, statusText: 'error' });
  });

  it('should send a successful request to get recent a query or a response by id', () => {
    queryService.getQueryById(1)
                .subscribe(response => expect(response.id).toEqual(1), () => fail('Should not have failed!'));

    const request = httpTestingController.expectOne('http://localhost:8080/getQuery/1');
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual('http://localhost:8080/getQuery/1');

    request.flush({ id: 1 } as IQuery);
  });

  it('should send an unsuccessful request to get a query or a response by id', () => {
    queryService.getQueryById(2)
                .subscribe(() => fail('Should have failed'), error => expect(error.error).toEqual('error'));

    const request = httpTestingController.expectOne('http://localhost:8080/getQuery/2');
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual('http://localhost:8080/getQuery/2');

    request.flush('error', { status: 401, statusText: 'error' });
  });

  it('should send a successful request to create a query', () => {
    queryService.createQuery({} as IQuery, 'username')
                .subscribe(response => expect(response.id).toEqual(1), () => fail('Should not have failed!'));

    const request = httpTestingController.expectOne('http://localhost:8080/username/createQuery');
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual({});
    expect(request.request.url).toEqual('http://localhost:8080/username/createQuery');

    request.flush({ id: 1 } as IQuery);
  });

  it('should send an unsuccessful request to create a query', () => {
    queryService.createQuery({} as IQuery, 'username')
                .subscribe(() => fail('Should have failed'), error => expect(error.error).toEqual('error'));

    const request = httpTestingController.expectOne('http://localhost:8080/username/createQuery');
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual({});
    expect(request.request.url).toEqual('http://localhost:8080/username/createQuery');

    request.flush('error', { status: 401, statusText: 'error' });
  });

  it('should send a successful request to create a response', () => {
    queryService.createResponse({} as IQuery, 'username', 0)
                .subscribe(response => expect(response.id).toEqual(1), () => fail('Should not have failed!'));

    const request = httpTestingController.expectOne('http://localhost:8080/username/0/createResponse');
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual({});
    expect(request.request.url).toEqual('http://localhost:8080/username/0/createResponse');

    request.flush({ id: 1 } as IQuery);
  });

  it('should send an unsuccessful request to create a response', () => {
    queryService.createResponse({} as IQuery, 'username', 0)
                .subscribe(() => fail('Should have failed'), error => expect(error.error).toEqual('error'));

    const request = httpTestingController.expectOne('http://localhost:8080/username/0/createResponse');
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual({});
    expect(request.request.url).toEqual('http://localhost:8080/username/0/createResponse');

    request.flush('error', { status: 401, statusText: 'error' });
  });

  it('should send a successful request to create a response', () => {
    queryService.submitVote({} as IQueryVote)
                .subscribe(response => expect(response.id).toEqual(1), () => fail('Should not have failed!'));

    const request = httpTestingController.expectOne('http://localhost:8080/vote');
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual({});
    expect(request.request.url).toEqual('http://localhost:8080/vote');

    request.flush({ id: 1 } as IQuery);
  });

  it('should send an unsuccessful request to create a response', () => {
    queryService.submitVote({} as IQueryVote)
                .subscribe(() => fail('Should have failed'), error => expect(error.error).toEqual('error'));

    const request = httpTestingController.expectOne('http://localhost:8080/vote');
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual({});
    expect(request.request.url).toEqual('http://localhost:8080/vote');

    request.flush('error', { status: 401, statusText: 'error' });
  });
});
