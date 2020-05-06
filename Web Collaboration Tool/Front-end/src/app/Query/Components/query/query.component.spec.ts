import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryComponent } from './query.component';
import {QueryModule} from '../../query.module';
import {RouterTestingModule} from '@angular/router/testing';
import {of, throwError} from 'rxjs';
import {IQuery} from '../../Interfaces/IQuery';
import {ActivatedRoute} from '@angular/router';

describe('QueryComponent', () => {
  let component: QueryComponent;
  let fixture: ComponentFixture<QueryComponent>;

  describe('testing when route resolved successfully', () => {
    const activatedRouteStub = { data: of({ query: { id: 0} as IQuery } ) };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          QueryModule,
          RouterTestingModule
        ],
        providers: [ { provide: ActivatedRoute, useValue: activatedRouteStub } ]
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

    it('should initialize fields successfully', () => {
      expect(component.query.id).toEqual(0);
      expect(component.resolverError).toEqual('');
    });
  });

  describe('testing when route failed to resolve', () => {
    const activatedRouteStub = { data: throwError('Error') };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          QueryModule,
          RouterTestingModule
        ],
        providers: [ { provide: ActivatedRoute, useValue: activatedRouteStub } ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(QueryComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should set error message when route failed to resolve', () => {
      expect(component.query).toEqual({} as IQuery);
      expect(component.resolverError).toEqual('Error');
    });
  });
});
