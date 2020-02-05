import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageComponent } from './user-page.component';
import {UserFeatureModule} from '../user-feature.module';
import {IUserProfile} from '../Interfaces/IUserProfile';
import {UserService} from '../Services/user.service';

describe('UserPageComponent', () => {
  let component: UserPageComponent;
  let fixture: ComponentFixture<UserPageComponent>;

  const userServiceStub = {
    getUserProfile: () => {},
    updateUserPassword: (username: string, password: string) => {},
    updateUserEmail: (username: string, email: string) => {},
    updateUserProfile: (username: string, profile: IUserProfile ) => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ UserFeatureModule ],
      providers: [ {provide: UserService, useValue: userServiceStub }]
      // declarations: [ UserPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
