import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryVoteComponent } from './query-vote.component';
import {QueryModule} from '../../query.module';
import {QueryService} from '../../Services/query.service';
import {IQuery} from '../../Interfaces/IQuery';
import {of, throwError} from 'rxjs';

describe('QueryVoteComponent', () => {
  let component: QueryVoteComponent;
  let fixture: ComponentFixture<QueryVoteComponent>;

  const queryServiceStub = jasmine.createSpyObj('QueryService', [ 'submitVote' ]);

  beforeEach(() => spyOn(localStorage, 'getItem').and.returnValue('username'));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryVoteComponent ],
      imports: [ QueryModule ],
      providers: [ { provide: QueryService, useValue: queryServiceStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => component.query = { id: 0, rating: 0 } as IQuery);

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize fields successfully', () => {
    expect(component.queryVotedEvent).not.toBeUndefined();
    expect(component.queryVoteFailedEvent).not.toBeUndefined();
    expect(component.query.id).toEqual(0);
  });

  it('should emit queryVoted event when voted for the query successfully', () => {
    queryServiceStub.submitVote.and.returnValue(of({ id: 0, rating: 1 } as IQuery));
    const queryVotedEventSpy = spyOn(component.queryVotedEvent, 'emit');

    component.onVote(true);

    expect(queryServiceStub.submitVote).toHaveBeenCalledWith({ vote: true, username: 'username', queryId: 0 });
    expect(component.query.rating).toEqual(1);
    expect(queryVotedEventSpy).toHaveBeenCalledWith(component.query);
  });

  it('should emit queryVoteFailed event when vote submission failed', () => {
    queryServiceStub.submitVote.and.returnValue(throwError('Error'));
    const queryVotedEventSpy = spyOn(component.queryVoteFailedEvent, 'emit');

    component.onVote(true);

    expect(queryServiceStub.submitVote).toHaveBeenCalledWith({ vote: true, username: 'username', queryId: 0 });
    expect(component.query.rating).toEqual(0);
    expect(queryVotedEventSpy).toHaveBeenCalledWith('Failed to vote for the query; please try again later');
  });
});
