import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCollaborationChatsComponent } from './private-collaboration-chats.component';
import {of, throwError} from 'rxjs';
import {IPrivateCollaboration} from '../../Interfaces/IPrivateCollaboration';
import {RouterTestingModule} from '@angular/router/testing';
import {PrivateCollaborationModule} from '../../private-collaboration.module';
import {ActivatedRoute} from '@angular/router';

describe('PrivateCollaborationChatComponent', () => {
  let component: PrivateCollaborationChatsComponent;
  let fixture: ComponentFixture<PrivateCollaborationChatsComponent>;

  beforeEach(() => spyOn(localStorage, 'getItem').and.returnValue('username'));

  describe('testing when route resolved successfully', () => {
    const mockPrivateCollaborations = [ {} as IPrivateCollaboration, {} as IPrivateCollaboration ];
    const activatedRouteStub = { data: of({ privateCollaborations: mockPrivateCollaborations }) };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ PrivateCollaborationChatsComponent ],
        imports: [
          PrivateCollaborationModule,
          RouterTestingModule
        ],
        providers: [ { provide: ActivatedRoute, useValue: activatedRouteStub } ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(PrivateCollaborationChatsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize fields successfully', () => {
      expect(component.collaborations).toEqual(mockPrivateCollaborations);
      expect(component.loggedInUser).toEqual('username');
      expect(component.resolverError).toEqual('');
    });
  });

  describe('testing when route failed to resolve', () => {
    const activatedRouteStub = { data: throwError('Error') };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ PrivateCollaborationChatsComponent ],
        imports: [
          PrivateCollaborationModule,
          RouterTestingModule
        ],
        providers: [ { provide: ActivatedRoute, useValue: activatedRouteStub } ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(PrivateCollaborationChatsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should set an error message when failed to resolve', () => {
      expect(component.collaborations.length).toEqual(0);
      expect(component.loggedInUser).toEqual('username');
      expect(component.resolverError).toEqual('Error');
    })
  });
});
