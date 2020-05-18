import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryContainerComponent } from './query-container.component';
import {QueryModule} from '../../query.module';
import {QueryService} from '../../Services/query.service';
import {IQuery} from '../../Interfaces/IQuery';
import {of, throwError} from 'rxjs';
import {IResponse} from '../../Interfaces/IResponse';

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

    component.response = { id: 0, response: 'Contents'  } as IResponse;

    fixture.detectChanges();
  });

  beforeEach(() => spyOn(localStorage, 'getItem').and.returnValue('username'));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize components', () => {
    expect(component.response.id).toEqual(0);
    expect(component.errorMessage).toEqual('');
  });

  it('should update query when queryVotedEvent is emitted', () => {
    expect(component.response.rating).not.toEqual(1);
    component.onQueryVote({ id: 0, rating: 1 } as IResponse);
    expect(component.response.rating).toEqual(1);
  });

  it('should set an error message when queryVoteFailed event is emitted', () => {
    component.onQueryVoteFailure('Error');
    expect(component.errorMessage).toEqual('Error');
  });
});
