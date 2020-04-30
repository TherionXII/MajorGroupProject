import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupsComponent } from './user-groups.component';
import {of} from 'rxjs';
import {IGroup} from '../../Interfaces/IGroup';
import {GroupCollaborationModule} from '../../group-collaboration.module';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

fdescribe('UserGroupsComponent', () => {
  let component: UserGroupsComponent;
  let fixture: ComponentFixture<UserGroupsComponent>;

  const userGroupOne = { id: 0, title: 'title 1', description: 'description1', thread: { id: 0 } } as IGroup;
  const userGroupTwo =  { id: 1, title: 'title 2', description: 'description2', thread: { id: 1 } } as IGroup;

  const activatedRouteStub  = { data: of({ userGroups: [ [ userGroupOne, userGroupTwo], '' ] } )};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupsComponent ],
      imports: [
        GroupCollaborationModule,
        RouterTestingModule
      ],
      providers: [ { provide: ActivatedRoute, useValue: activatedRouteStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize fields properly', () => {
    expect(component.userGroups[0]).toEqual(userGroupOne);
    expect(component.userGroups[1]).toEqual(userGroupTwo);
  })
});
