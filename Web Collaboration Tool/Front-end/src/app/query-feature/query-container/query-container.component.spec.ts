import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryContainerComponent } from './query-container.component';
import {QueryFeatureModule} from '../query-feature.module';

describe('QueryContainerComponent', () => {
  let component: QueryContainerComponent;
  let fixture: ComponentFixture<QueryContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ QueryFeatureModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
