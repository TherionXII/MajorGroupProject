import { TestBed } from '@angular/core/testing';

import { QueryService } from './query.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {IQuery} from '../Interfaces/IQuery';
import {IQueryVote} from '../Interfaces/IQueryVote';

describe('QueryService', () => {
  let queryService: QueryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [ QueryService ]
  }));

  beforeEach(() => {
      queryService = TestBed.inject(QueryService);
      httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(queryService).toBeTruthy();
  });

  it('should send a successful request to get recent public queries', () => {
    queryService.getRecentPublicQueries()
                .subscribe(response => expect(response.length).toEqual(2), () => fail('Should have succeeded!'));

    const request = httpTestingController.expectOne('http://localhost:8080/api/queries/publicQueries/getRecentQueries');
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual('http://localhost:8080/api/queries/publicQueries/getRecentQueries');

    request.flush(new Array<IQuery>({} as IQuery, {} as IQuery));
  });

  it('should send an unsuccessful request to get recent public queries', () => {
    queryService.getRecentPublicQueries()
                .subscribe(() => fail('Should have failed'), error => expect(error.error).toEqual('error'));

    const request = httpTestingController.expectOne('http://localhost:8080/api/queries/publicQueries/getRecentQueries');
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual('http://localhost:8080/api/queries/publicQueries/getRecentQueries');

    request.flush('error', { status: 401, statusText: 'error' });
  });

  it('should send a successful request to get recent group queries', () => {
    queryService.getRecentGroupQueries('0')
      .subscribe(response => expect(response.length).toEqual(2), () => fail('Should have succeeded!'));

    const request = httpTestingController.expectOne('http://localhost:8080/api/queries/groupQueries/0/getRecentQueries');
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual('http://localhost:8080/api/queries/groupQueries/0/getRecentQueries');

    request.flush(new Array<IQuery>({} as IQuery, {} as IQuery));
  })

  it('should send an unsuccessful request to get recent group queries', () => {
    queryService.getRecentGroupQueries('0')
      .subscribe(() => fail('Should have failed'), error => expect(error.error).toEqual('error'));

    const request = httpTestingController.expectOne('http://localhost:8080/api/queries/groupQueries/0/getRecentQueries');
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual('http://localhost:8080/api/queries/groupQueries/0/getRecentQueries');

    request.flush('error', { status: 401, statusText: 'error' });
  })

  it('should send a successful request to get recent queries for user', () => {
    queryService.getRecentQueriesForUser('username')
                .subscribe(response => expect(response.length).toEqual(2), () => fail('Should not have failed!'));

    const request = httpTestingController.expectOne('http://localhost:8080/api/queries/publicQueries/username/getRecentQueries');
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual('http://localhost:8080/api/queries/publicQueries/username/getRecentQueries');

    request.flush(new Array<IQuery>({} as IQuery, {} as IQuery));
  });

  it('should send an unsuccessful request to get recent queries for user', () => {
    queryService.getRecentQueriesForUser('username')
                .subscribe(() => fail('Should have failed'), error => expect(error.error).toEqual('error'));

    const request = httpTestingController.expectOne('http://localhost:8080/api/queries/publicQueries/username/getRecentQueries');
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual('http://localhost:8080/api/queries/publicQueries/username/getRecentQueries');

    request.flush('error', { status: 401, statusText: 'error' });
  });

  it('should send a successful request to get recent responses for user', () => {
    queryService.getRecentResponsesForUser('username')
                .subscribe(response => expect(response.length).toEqual(2), () => fail('Should not have failed!'));

    const request = httpTestingController.expectOne('http://localhost:8080/api/queries/publicQueries/username/getRecentResponses');
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual('http://localhost:8080/api/queries/publicQueries/username/getRecentResponses');

    request.flush(new Array<IQuery>({} as IQuery, {} as IQuery));
  });

  it('should send an unsuccessful request to get recent responses for user', () => {
    queryService.getRecentResponsesForUser('username')
                .subscribe(() => fail('Should have failed'), error => expect(error.error).toEqual('error'));

    const request = httpTestingController.expectOne('http://localhost:8080/api/queries/publicQueries/username/getRecentResponses');
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual('http://localhost:8080/api/queries/publicQueries/username/getRecentResponses');

    request.flush('error', { status: 401, statusText: 'error' });
  });

  it('should send a successful request to get recent a query or a response by id', () => {
    queryService.getQueryById('1')
                .subscribe(response => expect(response.id).toEqual(1), () => fail('Should not have failed!'));

    const request = httpTestingController.expectOne('http://localhost:8080/api/queries/1/getQuery');
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual('http://localhost:8080/api/queries/1/getQuery');

    request.flush({ id: 1 } as IQuery);
  });

  it('should send an unsuccessful request to get a query or a response by id', () => {
    queryService.getQueryById('1')
                .subscribe(() => fail('Should have failed'), error => expect(error.error).toEqual('error'));

    const request = httpTestingController.expectOne('http://localhost:8080/api/queries/1/getQuery');
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual('http://localhost:8080/api/queries/1/getQuery');

    request.flush('error', { status: 401, statusText: 'error' });
  });

  it('should send a successful request to create a public query', () => {
    queryService.createQuery(undefined, { username: 'username' } as IQuery, true)
                .subscribe(response => expect(response.id).toEqual(1), () => fail('Should not have failed!'));

    const request = httpTestingController.expectOne('http://localhost:8080/api/queries/publicQueries/username/createQuery');
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual({ username: 'username' } as IQuery);
    expect(request.request.url).toEqual('http://localhost:8080/api/queries/publicQueries/username/createQuery');

    request.flush({ id: 1 } as IQuery);
  });

  it('should send an unsuccessful request to create a public query', () => {
    queryService.createQuery(undefined, { username: 'username' } as IQuery, true)
                .subscribe(() => fail('Should have failed'), error => expect(error.error).toEqual('error'));

    const request = httpTestingController.expectOne('http://localhost:8080/api/queries/publicQueries/username/createQuery');
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual({ username: 'username' } as IQuery);
    expect(request.request.url).toEqual('http://localhost:8080/api/queries/publicQueries/username/createQuery');

    request.flush('error', { status: 401, statusText: 'error' });
  });

  it('should send a successful request to create a group query', () => {
    queryService.createQuery('0', { username: 'username' } as IQuery, false)
      .subscribe(response => expect(response.id).toEqual(1), () => fail('Should not have failed!'));

    const request = httpTestingController.expectOne('http://localhost:8080/api/queries/groupQueries/username/0/createQuery');
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual({ username: 'username' } as IQuery);
    expect(request.request.url).toEqual('http://localhost:8080/api/queries/groupQueries/username/0/createQuery');

    request.flush({ id: 1 } as IQuery);
  });

  it('should send an unsuccessful request to create a group query', () => {
    queryService.createQuery('0', { username: 'username' } as IQuery, false)
      .subscribe(() => fail('Should have failed'), error => expect(error.error).toEqual('error'));

    const request = httpTestingController.expectOne('http://localhost:8080/api/queries/groupQueries/username/0/createQuery');
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual({ username: 'username' } as IQuery);
    expect(request.request.url).toEqual('http://localhost:8080/api/queries/groupQueries/username/0/createQuery');

    request.flush('error', { status: 401, statusText: 'error' });
  });

  it('should send a successful request to create a response', () => {
    queryService.createResponse(0, 'username', {} as IQuery)
                .subscribe(response => expect(response.id).toEqual(1), () => fail('Should not have failed!'));

    const request = httpTestingController.expectOne('http://localhost:8080/api/queries/publicQueries/username/0/createResponse');
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual({});
    expect(request.request.url).toEqual('http://localhost:8080/api/queries/publicQueries/username/0/createResponse');

    request.flush({ id: 1 } as IQuery);
  });

  it('should send an unsuccessful request to create a response', () => {
    queryService.createResponse(0, 'username', {} as IQuery)
                .subscribe(() => fail('Should have failed'), error => expect(error.error).toEqual('error'));

    const request = httpTestingController.expectOne('http://localhost:8080/api/queries/publicQueries/username/0/createResponse');
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual({});
    expect(request.request.url).toEqual('http://localhost:8080/api/queries/publicQueries/username/0/createResponse');

    request.flush('error', { status: 401, statusText: 'error' });
  });

  it('should send a successful request to submit a vote', () => {
    queryService.submitVote({ queryId: 1 } as IQueryVote)
                .subscribe(response => expect(response.id).toEqual(1), () => fail('Should not have failed!'));

    const request = httpTestingController.expectOne('http://localhost:8080/1/vote');
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual({ queryId: 1 } as IQueryVote);
    expect(request.request.url).toEqual('http://localhost:8080/1/vote');

    request.flush({ id: 1 } as IQuery);
  });

  it('should send an unsuccessful request to submit a vote', () => {
    queryService.submitVote({ queryId: 1 } as IQueryVote)
                .subscribe(() => fail('Should have failed'), error => expect(error.error).toEqual('error'));

    const request = httpTestingController.expectOne('http://localhost:8080/1/vote');
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual({ queryId: 1 } as IQueryVote);
    expect(request.request.url).toEqual('http://localhost:8080/1/vote');

    request.flush('error', { status: 401, statusText: 'error' });
  });
});
