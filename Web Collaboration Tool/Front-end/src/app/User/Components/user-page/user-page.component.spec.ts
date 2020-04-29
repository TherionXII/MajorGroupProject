import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { UserPageComponent } from './user-page.component';
import {UserModule} from '../../user.module';
import {UserService} from '../../Services/user.service';
import {QueryService} from '../../../Query/Services/query.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute, ActivatedRouteSnapshot, Data, Router} from '@angular/router';
import {Type} from '@angular/core';
import {of, pipe, throwError} from 'rxjs';
import {IUserProfile} from '../../Interfaces/IUserProfile';
import {IQuery} from '../../../Query/Interfaces/IQuery';
import {mergeMap, take} from 'rxjs/operators';
import {UserDataResolverService} from '../../../Utility/Resolvers/UserResolvers/user-data-resolver.service';

describe('UserPageComponent', () => {
  let component: UserPageComponent;
  let fixture: ComponentFixture<UserPageComponent>;

  let routeStub;

  const userService = jasmine.createSpyObj('UserService', [ 'getUserProfile' ]);
  const queryService = jasmine.createSpyObj('QueryService', [ 'getRecentQueriesForUser', 'getRecentResponsesForUser' ]);

  beforeEach(() => {
    routeStub = {
      data: of({
        userProfile: { name: 'name', surname: 'surname' } as IUserProfile,
        queries: [ { title: 'title' } as IQuery, {} as IQuery ],
        responses: [ { parent: { user: { username: 'username' } } } as IQuery ]
      })
    };

    TestBed.configureTestingModule({
      imports: [
        UserModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: QueryService, useValue: queryService },
        { provide: ActivatedRoute, useValue: routeStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should have resolved the profile', () => {
    expect(component.userProfile.name).toEqual('name');
    expect(component.userProfile.surname).toEqual('surname');
  });

  it('should have resolved the queries', () => {
    expect(component.userQueries.length).toEqual(2);
    expect(component.userQueries[0].title).toEqual('title');
  });

  it('should have resolved the responses', () => {
    expect(component.userResponses.length).toEqual(1);
    expect(component.userResponses[0].parent.user.username).toEqual('username');
  });

  it('should return the username of the owner of the parent query', () => {
    const query = { parent: { parent: { user: { username: 'username' } } } };

    expect(component.getOwnerUsername(query as IQuery)).toEqual('username');
  });
});
