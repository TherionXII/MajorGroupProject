import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageComponent } from './user-page.component';
import {UserFeatureModule} from '../user-feature.module';
import {UserService} from '../Services/user.service';
import {QueryService} from '../../query-feature/services/query.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {Type} from '@angular/core';
import {of, throwError} from 'rxjs';
import {IUserProfile} from '../Interfaces/IUserProfile';
import {IQuery} from '../../query-feature/Interfaces/IQuery';

describe('UserPageComponent', () => {
  let component: UserPageComponent;
  let fixture: ComponentFixture<UserPageComponent>;

  const userService = jasmine.createSpyObj('UserService', [ 'getUserProfile' ]);
  const queryService = jasmine.createSpyObj('QueryService', [ 'getRecentQueriesForUser', 'getRecentResponsesForUser' ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        UserFeatureModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: QueryService, useValue: queryService }
      ]
    })
    .compileComponents();
  }));

  it('should create', () => {
    spyOn(TestBed.inject(ActivatedRoute as Type<ActivatedRoute>).snapshot.paramMap, 'get').and.returnValue('username');

    userService.getUserProfile.and.returnValue(of({} as IUserProfile));
    queryService.getRecentQueriesForUser.and.returnValue(of([ { user: { username: 'username' } } as IQuery ]));
    queryService.getRecentResponsesForUser.and.returnValue(of([ { parent: { user: { username: 'username' } } } as IQuery ]));

    fixture = TestBed.createComponent(UserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should have username set to the parameter from the URL', () => {
    const getSpy = spyOn(TestBed.inject(ActivatedRoute as Type<ActivatedRoute>).snapshot.paramMap, 'get').and.returnValue('username');

    userService.getUserProfile.and.returnValue(of({} as IUserProfile));
    queryService.getRecentQueriesForUser.and.returnValue(of([ { user: { username: 'username' } } as IQuery ]));
    queryService.getRecentResponsesForUser.and.returnValue(of([ { parent: { user: { username: 'username' } } } as IQuery ]));

    fixture = TestBed.createComponent(UserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.username).toEqual('username');
    expect(getSpy).toHaveBeenCalledWith('username');
  });

  it('should retrieve the profile of the user with the username as in URL', () => {
    const getSpy = spyOn(TestBed.inject(ActivatedRoute as Type<ActivatedRoute>).snapshot.paramMap, 'get').and.returnValue('username');

    const getUserProfileSpy = userService.getUserProfile.and.returnValue(of({ name: 'name', surname: 'surname' } as IUserProfile));
    queryService.getRecentQueriesForUser.and.returnValue(of([ { user: { username: 'username' } } as IQuery ]));
    queryService.getRecentResponsesForUser.and.returnValue(of([ { parent: { user: { username: 'username' } } } as IQuery ]));

    fixture = TestBed.createComponent(UserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(getSpy).toHaveBeenCalledWith('username');
    expect(getUserProfileSpy).toHaveBeenCalledWith('username');
    expect(component.userProfile.name).toEqual('name');
    expect(component.userProfile.surname).toEqual('surname');
  });

  it('should set an error when failed to retrieve user profile', () => {
    const getSpy = spyOn(TestBed.inject(ActivatedRoute as Type<ActivatedRoute>).snapshot.paramMap, 'get').and.returnValue('username');

    const getUserProfileSpy = userService.getUserProfile.and.returnValue(throwError({ message: 'error' }));
    queryService.getRecentQueriesForUser.and.returnValue(of([ { user: { username: 'username' } } as IQuery ]));
    queryService.getRecentResponsesForUser.and.returnValue(of([ { parent: { user: { username: 'username' } } } as IQuery ]));

    fixture = TestBed.createComponent(UserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(getSpy).toHaveBeenCalledWith('username');
    expect(getUserProfileSpy).toHaveBeenCalledWith('username');
    expect(component.userProfile).toEqual(undefined);
    expect(component.initError).toEqual('error');
  });

  it('should retrieve recent queries of the user with the username as in URL', () => {
    const getSpy = spyOn(TestBed.inject(ActivatedRoute as Type<ActivatedRoute>).snapshot.paramMap, 'get').and.returnValue('username');

    userService.getUserProfile.and.returnValue(of({ name: 'name', surname: 'surname' } as IUserProfile));
    const getRecentQueriesSpy = queryService.getRecentQueriesForUser.and.returnValue(of([ { user: { username: 'username' } } as IQuery ]));
    queryService.getRecentResponsesForUser.and.returnValue(of([ { parent: { user: { username: 'username' } } } as IQuery ]));

    fixture = TestBed.createComponent(UserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(getSpy).toHaveBeenCalledWith('username');
    expect(getRecentQueriesSpy).toHaveBeenCalledWith('username');
    expect(component.userQueries.length).toEqual(1);
    expect(component.userQueries[0].user.username).toEqual('username');
  });

  it('should set an error message when failed to retrieve queries of the user', () => {
    const getSpy = spyOn(TestBed.inject(ActivatedRoute as Type<ActivatedRoute>).snapshot.paramMap, 'get').and.returnValue('username');

    userService.getUserProfile.and.returnValue(of({ name: 'name', surname: 'surname' } as IUserProfile));
    const getRecentQueriesSpy = queryService.getRecentQueriesForUser.and.returnValue(throwError({ message: 'error' }));
    queryService.getRecentResponsesForUser.and.returnValue(of([ { parent: { user: { username: 'username' } } } as IQuery ]));

    fixture = TestBed.createComponent(UserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(getSpy).toHaveBeenCalledWith('username');
    expect(getRecentQueriesSpy).toHaveBeenCalledWith('username');
    expect(component.userQueries).toEqual(undefined);
    expect(component.initError).toEqual('error');
  });

  it('should retrieve recent responses of the user with the username as in URL', () => {
    const getSpy = spyOn(TestBed.inject(ActivatedRoute as Type<ActivatedRoute>).snapshot.paramMap, 'get').and.returnValue('username');

    userService.getUserProfile.and.returnValue(of({ name: 'name', surname: 'surname' } as IUserProfile));
    queryService.getRecentQueriesForUser.and.returnValue(of([ { user: { username: 'username' } } as IQuery ]));
    const getRecentResponsesSpy = queryService.getRecentResponsesForUser.and.returnValue(of([ { parent: { user: { username: 'username' } } } as IQuery ]));

    fixture = TestBed.createComponent(UserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(getSpy).toHaveBeenCalledWith('username');
    expect(getRecentResponsesSpy).toHaveBeenCalledWith('username');
    expect(component.userResponses.length).toEqual(1);
    expect(component.userResponses[0].parent.user.username).toEqual('username');
  });

  it('should set an error message when failed to retrieve responses of the user', () => {
    const getSpy = spyOn(TestBed.inject(ActivatedRoute as Type<ActivatedRoute>).snapshot.paramMap, 'get').and.returnValue('username');

    userService.getUserProfile.and.returnValue(of({ name: 'name', surname: 'surname' } as IUserProfile));
    queryService.getRecentQueriesForUser.and.returnValue(of([ { user: { username: 'username' } } as IQuery ]));
    const getRecentResponsesSpy = queryService.getRecentResponsesForUser.and.returnValue(throwError({ message: 'error' }));

    fixture = TestBed.createComponent(UserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(getSpy).toHaveBeenCalledWith('username');
    expect(getRecentResponsesSpy).toHaveBeenCalledWith('username');
    expect(component.userResponses).toEqual(undefined);
    expect(component.initError).toEqual('error');
  });

  it('should return the username of the owner of the parent query', () => {
    spyOn(TestBed.inject(ActivatedRoute as Type<ActivatedRoute>).snapshot.paramMap, 'get').and.returnValue('username');

    userService.getUserProfile.and.returnValue(of({} as IUserProfile));
    queryService.getRecentQueriesForUser.and.returnValue(of([ { user: { username: 'username' } } as IQuery ]));
    queryService.getRecentResponsesForUser.and.returnValue(of([ { parent: { user: { username: 'username' } } } as IQuery ]));

    fixture = TestBed.createComponent(UserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const query = { parent: { parent: { user: { username: 'username' } } } };

    expect(component.getOwnerUsername(query as IQuery)).toEqual('username');
  });
});
