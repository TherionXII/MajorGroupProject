import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentUserResponsesComponent } from './recent-user-responses.component';
import {IQuery} from '../../../Query/Interfaces/IQuery';
import {of, throwError} from 'rxjs';
import {UserModule} from '../../user.module';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';

describe('RecentUserResponsesComponent', () => {
  let component: RecentUserResponsesComponent;
  let fixture: ComponentFixture<RecentUserResponsesComponent>;

  describe('testing when route resolved successfully', () => {
    const mockResponses = [ {} as IQuery, {} as IQuery ];
    const activatedRouteStub = { data: of({ userData: [ '', mockResponses ] }) };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ RecentUserResponsesComponent ],
        imports: [
          UserModule,
          RouterTestingModule
        ],
        providers: [ { provide: ActivatedRoute, useValue: activatedRouteStub } ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(RecentUserResponsesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize fields successfully', () => {
      expect(component.userResponses.length).toEqual(2);
      expect(component.resolverError).toEqual('');
    });

    it('should return the username of the root query owner', () => {
      const mockQuery = { username: 'not-owner', parent: { username: 'owner' } } as IQuery;

      expect(component.getOwnerUsername(mockQuery)).toEqual('owner');
    });
  });

  describe('testing when route failed to resolve', () => {
    const activatedRouteStub = { data: throwError('Error') };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ RecentUserResponsesComponent ],
        imports: [
          UserModule,
          RouterTestingModule
        ],
        providers: [ { provide: ActivatedRoute, useValue: activatedRouteStub } ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(RecentUserResponsesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should set an error message when route failed to resolve', () => {
      expect(component.userResponses.length).toEqual(0);
      expect(component.resolverError).toEqual('Error');
    });
  });
});
