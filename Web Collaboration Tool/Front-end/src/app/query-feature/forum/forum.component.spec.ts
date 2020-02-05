import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumComponent } from './forum.component';
import {QueryFeatureModule} from '../query-feature.module';

describe('ForumComponent', () => {
  let component: ForumComponent;
  let fixture: ComponentFixture<ForumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ QueryFeatureModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
