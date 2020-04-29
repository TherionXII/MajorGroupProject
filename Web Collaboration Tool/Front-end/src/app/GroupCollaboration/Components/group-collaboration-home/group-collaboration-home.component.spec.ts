import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCollaborationHomeComponent } from './group-collaboration-home.component';

describe('GroupCollaborationPageComponent', () => {
  let component: GroupCollaborationHomeComponent;
  let fixture: ComponentFixture<GroupCollaborationHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupCollaborationHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupCollaborationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
