import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCollaborationChatCreationComponent } from './private-collaboration-chat-creation.component';
import {PrivateCollaborationModule} from '../../private-collaboration.module';
import {RouterTestingModule} from '@angular/router/testing';
import {ThreadService} from '../../../Utility/Services/thread.service';
import {ActivatedRoute, Router} from '@angular/router';
import {of, throwError} from 'rxjs';
import {IPrivateCollaboration} from '../../Interfaces/IPrivateCollaboration';

describe('PrivateCollaborationChatCreationComponent', () => {
  let component: PrivateCollaborationChatCreationComponent;
  let fixture: ComponentFixture<PrivateCollaborationChatCreationComponent>;

  const threadServiceStub = jasmine.createSpyObj('ThreadService', [ 'createNewThread' ]);

  beforeEach(() => spyOn(localStorage, 'getItem').and.returnValue('username'));

  describe(' testing when route resolved successfully', () => {
    const mockPrivateCollaborations = [ { firstCollaborator: 'user1', secondCollaborator: 'user2' } as IPrivateCollaboration ];
    const activatedRouteStub = { data: of({ privateCollaborations: mockPrivateCollaborations } ) };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ PrivateCollaborationChatCreationComponent ],
        imports: [
          PrivateCollaborationModule,
          RouterTestingModule
        ],
        providers: [
          { provide: ThreadService, useValue: threadServiceStub },
          { provide: ActivatedRoute, useValue: activatedRouteStub }
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(PrivateCollaborationChatCreationComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize fields successfully', () => {
      expect(component.collaborations).toEqual(mockPrivateCollaborations);
      expect(component.loggedInUser).toEqual('username');
      expect(component.chatError).toEqual('');
    });

    it('should successfully create a new chat', () => {
      threadServiceStub.createNewThread.and.returnValue(of(0));

      const navigateByUrlSpy = spyOn(TestBed.inject(Router), 'navigateByUrl');
      component.onNewThread(component.collaborations[0]);

      expect(threadServiceStub.createNewThread).toHaveBeenCalledWith(component.collaborations[0].firstCollaborator,
                                                                     component.collaborations[0].secondCollaborator);
      expect(navigateByUrlSpy).toHaveBeenCalledWith('/thread/0');
      expect(component.chatError).toEqual('');
    });

    it('should set an error message when failed to create a chat', () => {
      threadServiceStub.createNewThread.and.returnValue(throwError('Error'));

      const navigateByUrlSpy = spyOn(TestBed.inject(Router), 'navigateByUrl');
      component.onNewThread(component.collaborations[0]);

      expect(threadServiceStub.createNewThread).toHaveBeenCalledWith(component.collaborations[0].firstCollaborator,
                                                                     component.collaborations[0].secondCollaborator);
      expect(navigateByUrlSpy).not.toHaveBeenCalledWith('/thread/0');
      expect(component.chatError).toEqual('Failed to create new chat; please try again later');
    })
  });

  describe('testing when route failed to resolve', () => {
    const activatedRouteStub = { data: throwError('Error') };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ PrivateCollaborationChatCreationComponent ],
        imports: [
          PrivateCollaborationModule,
          RouterTestingModule
        ],
        providers: [
          { provide: ThreadService, useValue: threadServiceStub },
          { provide: ActivatedRoute, useValue: activatedRouteStub }
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(PrivateCollaborationChatCreationComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should set an error message when failed to resolve', () => {
      expect(component.collaborations.length).toEqual(0);
      expect(component.loggedInUser).toEqual('username');
      expect(component.chatError).toEqual('Error');
    });
  });
});
