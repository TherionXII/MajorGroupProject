import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryComponent } from './query.component';
import {QueryFeatureModule} from '../query-feature.module';

describe('QueryComponent', () => {
  let component: QueryComponent;
  let fixture: ComponentFixture<QueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ QueryFeatureModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
