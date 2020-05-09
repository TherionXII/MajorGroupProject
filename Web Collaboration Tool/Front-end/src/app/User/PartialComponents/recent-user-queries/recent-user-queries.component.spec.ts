import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentUserQueriesComponent } from './recent-user-queries.component';
import {of, throwError} from 'rxjs';
import {IQuery} from '../../../Query/Interfaces/IQuery';
import {UserModule} from '../../user.module';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';

describe('RecentUserQueriesComponent', () => {
  let component: RecentUserQueriesComponent;
  let fixture: ComponentFixture<RecentUserQueriesComponent>;

  describe('testing when route resolved successfully', () => {
    const mockQueries = [ {} as IQuery, {} as IQuery ];
    const activatedRouteStub = { data: of({ userData: [ mockQueries, '' ] }) };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ RecentUserQueriesComponent ],
        imports: [
          UserModule,
          RouterTestingModule
        ],
        providers: [ { provide: ActivatedRoute, useValue: activatedRouteStub } ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(RecentUserQueriesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize fields successfully', () => {
      expect(component.userQueries.length).toEqual(2);
      expect(component.resolverError).toEqual('');
    });
  });

  describe('testing when route failed to resolve', () => {
    const activatedRouteStub = { data: throwError('Error') };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ RecentUserQueriesComponent ],
        imports: [
          UserModule,
          RouterTestingModule
        ],
        providers: [ { provide: ActivatedRoute, useValue: activatedRouteStub } ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(RecentUserQueriesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should set an error message when route failed to resolve', () => {
      expect(component.userQueries.length).toEqual(0);
      expect(component.resolverError).toEqual('Error');
    });
  });
});
