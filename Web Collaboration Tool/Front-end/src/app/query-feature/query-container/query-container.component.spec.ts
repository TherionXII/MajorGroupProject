import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryContainerComponent } from './query-container.component';

describe('QueryContainerComponent', () => {
  let component: QueryContainerComponent;
  let fixture: ComponentFixture<QueryContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryContainerComponent ]
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
