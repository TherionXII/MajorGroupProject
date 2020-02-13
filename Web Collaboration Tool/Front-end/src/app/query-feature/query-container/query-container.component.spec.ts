import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryContainerComponent } from './query-container.component';
import {QueryFeatureModule} from '../query-feature.module';
import {QueryService} from '../services/query.service';
import {IQuery} from '../Interfaces/IQuery';
import {of, throwError} from 'rxjs';
import {IQueryVote} from '../Interfaces/IQueryVote';

describe('QueryContainerComponent', () => {
  let component: QueryContainerComponent;
  let fixture: ComponentFixture<QueryContainerComponent>;

  const queryService = jasmine.createSpyObj('QueryService', [ 'createResponse', 'submitVote' ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ QueryFeatureModule ],
      providers: [ { provide: QueryService, useValue: queryService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach( () => {
    let store = {};

    spyOn(localStorage, 'getItem').and.callFake((key) => store[key]);
    spyOn(localStorage, 'setItem').and.callFake( (key, value) => store[key] = value + '');
    spyOn(localStorage, 'clear').and.callFake(() => store = {});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when input is valid', () => {
    component.queryResponseForm.get('contents').setValue('contents');

    expect(component.queryResponseForm.valid).toBeTrue();
  });

  it('should have an invalid form when input is invalid', () => {
    component.queryResponseForm.get('contents').setValue('');

    expect(component.queryResponseForm.valid).toBeFalse();
  });

  it('should reverse value of isReplyVisible when onRespond is invoked', () => {
    expect(component.isReplyVisible).toBeFalse();

    component.onRespond();

    expect(component.isReplyVisible).toBeTrue();
  });

  it('should send a successful request to create a response for the query', () => {
    localStorage.setItem('username', 'username');

    const query: IQuery = { id: 0, contents: 'contents', rating: 0 };

    component.queryResponseForm.get('contents').setValue('contents');

    const createResponseSpy = queryService.createResponse.and.returnValue(of(query));
    const onRespondSpy = spyOn(component, 'onRespond');

    component.onSubmit(query.id);

    expect(createResponseSpy).toHaveBeenCalledWith(component.queryResponseForm.getRawValue() as IQuery, 'username', 0);
    expect(component.query).toEqual(query);
    expect(onRespondSpy).toHaveBeenCalled();
  });

  it('should set an error message when failed to create a query response', () => {
    localStorage.setItem('username', 'username');

    const query: IQuery = { id: 0, contents: 'contents', rating: 0 };

    component.queryResponseForm.get('contents').setValue('contents');

    const createResponseSpy = queryService.createResponse.and.returnValue(throwError({ message: 'error' }));
    const onRespondSpy = spyOn(component, 'onRespond');

    component.onSubmit(query.id);

    expect(createResponseSpy).toHaveBeenCalledWith(component.queryResponseForm.getRawValue() as IQuery, 'username', 0);
    expect(component.query).not.toEqual(query);
    expect(onRespondSpy).toHaveBeenCalled();
    expect(component.submissionError).toEqual('error');
  });

  it('should return an updated query when voted for query or a response', () => {
    localStorage.setItem('username', 'username');

    const query: IQuery = { id: 0, contents: 'contents', rating: 0 };

    const submitVoteSpy = queryService.submitVote.and.returnValue(of(query));

    component.onVote(query, true);

    expect(submitVoteSpy).toHaveBeenCalledWith({ vote: true, username: 'username', query } as IQueryVote);
    expect(component.query).toEqual(query);
  });

  it('should set an error message when failed to vote for a query or a response', () => {
    localStorage.setItem('username', 'username');

    const query: IQuery = { id: 0, contents: 'contents', rating: 0 };

    const submitVoteSpy = queryService.submitVote.and.returnValue(throwError({ message: 'error' }));

    component.onVote(query, true);

    expect(submitVoteSpy).toHaveBeenCalledWith({ vote: true, username: 'username', query } as IQueryVote);
    expect(component.query).not.toEqual(query);
    expect(component.submissionError).toEqual('error');
  });
});
