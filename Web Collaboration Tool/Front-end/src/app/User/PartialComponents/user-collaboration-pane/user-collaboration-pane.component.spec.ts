import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCollaborationPaneComponent } from './user-collaboration-pane.component';

describe('UserCollaborationPaneComponent', () => {
  let component: UserCollaborationPaneComponent;
  let fixture: ComponentFixture<UserCollaborationPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCollaborationPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCollaborationPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
