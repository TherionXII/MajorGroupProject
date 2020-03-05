import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCollaborationChatComponent } from './private-collaboration-chat.component';

describe('PrivateCollaborationChatComponent', () => {
  let component: PrivateCollaborationChatComponent;
  let fixture: ComponentFixture<PrivateCollaborationChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateCollaborationChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateCollaborationChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
