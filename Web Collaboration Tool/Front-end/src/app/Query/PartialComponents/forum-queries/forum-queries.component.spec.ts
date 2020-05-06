import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumQueriesComponent } from './forum-queries.component';
import {of, throwError} from 'rxjs';
import {IQuery} from '../../Interfaces/IQuery';
import {QueryModule} from '../../query.module';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';

describe('ForumQueriesComponent', () => {
  let component: ForumQueriesComponent;
  let fixture: ComponentFixture<ForumQueriesComponent>;

  describe('testing when route resolved successfully', () => {
    const activatedRouteStub = { data: of( { forumData: [ [ {} as IQuery, {} as IQuery ], '' ] }) };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ ForumQueriesComponent ],
        imports: [
          QueryModule,
          RouterTestingModule
        ],
        providers: [ { provide: ActivatedRoute, useValue: activatedRouteStub } ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ForumQueriesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize fields successfully', () => {
      expect(component.queries.length).toEqual(2);
      expect(component.resolverError).toEqual('');
    });
  });

  describe('testing when route failed to resolve', () => {
    const activatedRouteStub = { data: throwError('Error') };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ ForumQueriesComponent ],
        imports: [
          QueryModule,
          RouterTestingModule
        ],
        providers: [ { provide: ActivatedRoute, useValue: activatedRouteStub } ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ForumQueriesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should set error message when route failed to resolve', () => {
      expect(component.queries.length).toEqual(0);
      expect(component.resolverError).toEqual('Error');
    });
  });
});
