import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryContainerComponent } from './query-container.component';
import {QueryModule} from '../../query.module';
import {QueryService} from '../../Services/query.service';
import {IQuery} from '../../Interfaces/IQuery';
import {of, throwError} from 'rxjs';

describe('QueryContainerComponent', () => {
  let component: QueryContainerComponent;
  let fixture: ComponentFixture<QueryContainerComponent>;

  const queryService = jasmine.createSpyObj('QueryService', [ 'createResponse' ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ QueryModule ],
      providers: [ { provide: QueryService, useValue: queryService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryContainerComponent);
    component = fixture.componentInstance;

    component.response = { id: 0, contents: 'Contents', responses: [] } as IQuery;

    fixture.detectChanges();
  });

  beforeEach(() => spyOn(localStorage, 'getItem').and.returnValue('username'));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize components', () => {
    expect(component.isReplyVisible).toBeFalse();
    expect(component.response.id).toEqual(0);
    expect(component.errorMessage).toEqual('');
  });

  it('should update query when queryVotedEvent is emitted', () => {
    expect(component.response.rating).not.toEqual(1);
    component.onQueryVote({ id: 0, rating: 1 } as IQuery);
    expect(component.response.rating).toEqual(1);
  });

  it('should set an error message when queryVoteFailed event is emitted', () => {
    component.onQueryVoteFailure('Error');
    expect(component.errorMessage).toEqual('Error');
  });

  it('should reverse value of isReplyVisible when onRespond is invoked', () => {
    expect(component.isReplyVisible).toBeFalse();

    component.onRespond();

    expect(component.isReplyVisible).toBeTrue();
  });

  it('should send a successful request to create a response for the query', () => {
    const query = { id: 0, contents: 'contents', rating: 0 } as IQuery;

    const createResponseSpy = queryService.createResponse.and.returnValue(of(query));
    const onRespondSpy = spyOn(component, 'onRespond');

    component.queryResponseForm.get('contents').setValue('Response');

    component.onSubmit(query.id);

    expect(createResponseSpy).toHaveBeenCalledWith(0, 'username', component.queryResponseForm.getRawValue() as IQuery);
    expect(component.response).toEqual(query);
    expect(onRespondSpy).toHaveBeenCalled();
  });

  it('should set an error message when failed to create a query response', () => {
    const query = { id: 0, contents: 'contents', rating: 0 } as IQuery;

    const createResponseSpy = queryService.createResponse.and.returnValue(throwError({ message: 'error' }));
    const onRespondSpy = spyOn(component, 'onRespond');

    component.queryResponseForm.get('contents').setValue('Response');

    component.onSubmit(query.id);

    expect(createResponseSpy).toHaveBeenCalledWith(0, 'username', component.queryResponseForm.getRawValue() as IQuery);
    expect(component.response).not.toEqual(query);
    expect(onRespondSpy).toHaveBeenCalled();
    expect(component.errorMessage).toEqual('error');
  });
});
