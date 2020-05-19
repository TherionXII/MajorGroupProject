import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCreationComponent } from './group-creation.component';
import {RouterTestingModule} from '@angular/router/testing';
import {GroupCollaborationModule} from '../../group-collaboration.module';
import {GroupService} from '../../Services/group.service';
import {Router} from '@angular/router';
import {IGroup} from '../../Interfaces/IGroup';
import {of, throwError} from 'rxjs';
import {IThread} from '../../../Utility/Interfaces/IThread';
import {Type} from '@angular/core';
import Spy = jasmine.Spy;

describe('GroupCreationComponent', () => {
  let component: GroupCreationComponent;
  let fixture: ComponentFixture<GroupCreationComponent>;

  const groupServiceSpyObject = jasmine.createSpyObj('GroupService', [ 'createGroup' ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupCreationComponent ],
      imports: [
        GroupCollaborationModule,
        RouterTestingModule
      ],
      providers: [ { provide: GroupService, useValue: groupServiceSpyObject } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize fields on creation', () => {
    expect(component.newGroupForm).not.toBeUndefined();
    expect(component.createGroupError).toEqual('');
  });

  describe(' group creation form', () => {
    let routerNavigateByUrl: Spy;

    const group: IGroup = {
      id: 1,
      title: 'title',
      description: 'description',
      thread: { id: 0 } as IThread,
      groupMembers: null
    };

    beforeEach( () => {
      let store = {};

      spyOn(localStorage, 'getItem').and.callFake((key) => store[key]);
      spyOn(localStorage, 'setItem').and.callFake( (key, value) => store[key] = value + '');
      spyOn(localStorage, 'clear').and.callFake(() => store = {});
    });

    beforeEach(() => {
      const router = TestBed.inject(Router as Type<Router>);
      routerNavigateByUrl = spyOn(router, 'navigateByUrl');
    });

    it('should have a valid form when all inputs are valid', () => {
      component.newGroupForm.get('title').setValue(group.title);
      component.newGroupForm.get('description').setValue(group.description);

      expect(component.newGroupForm.valid).toBeTrue();
    });

    it('should have an valid form when inputs are invalid', () => {
      expect(component.newGroupForm.valid).toBeFalse();
    });

    it('should redirect on successful group creation', () => {
      localStorage.setItem('username', 'username');

      component.newGroupForm.get('title').setValue(group.title);
      component.newGroupForm.get('description').setValue(group.description);

      groupServiceSpyObject.createGroup.and.returnValue(of(group));

      component.onSubmit();

      expect(groupServiceSpyObject.createGroup).toHaveBeenCalled();
      expect(routerNavigateByUrl).toHaveBeenCalledWith(`/group/${group.id}/${group.thread.id}`);
      expect(component.createGroupError).toEqual('');
    });

    it('should set createGroupError to error message when failed to create a group', () => {
      localStorage.setItem('username', 'username');

      component.newGroupForm.get('title').setValue(group.title);
      component.newGroupForm.get('description').setValue(group.description);

      groupServiceSpyObject.createGroup.and.returnValue(throwError(''));

      component.onSubmit();

      expect(groupServiceSpyObject.createGroup).toHaveBeenCalled();
      expect(routerNavigateByUrl).not.toHaveBeenCalledWith(`/group/${group.id}/${group.thread.id}`);
      expect(component.createGroupError).toEqual('Something went wrong when creating your group; please try again later');
    });
  });
});
