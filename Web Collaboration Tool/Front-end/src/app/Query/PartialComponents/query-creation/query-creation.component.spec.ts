import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryCreationComponent } from './query-creation.component';
import {of, throwError} from 'rxjs';
import {QueryModule} from '../../query.module';
import {RouterTestingModule} from '@angular/router/testing';
import {QueryService} from '../../Services/query.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IQuery} from '../../Interfaces/IQuery';

describe('QueryCreationComponent', () => {
  let component: QueryCreationComponent;
  let fixture: ComponentFixture<QueryCreationComponent>;

  const queryServiceStub = jasmine.createSpyObj('QueryService', [ 'createQuery' ]);

  describe('testing when route resolved successfully', () => {
    const activatedRouteStub = {
      data: of({ forumData: [ '', true ] } ),
      snapshot: {
        paramMap: {
          get: (key: string) => undefined
        }
      }};

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ QueryCreationComponent ],
        imports: [
          QueryModule,
          RouterTestingModule
        ],
        providers: [
          { provide: QueryService, useValue: queryServiceStub },
          { provide: ActivatedRoute, useValue: activatedRouteStub }
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => spyOn(localStorage, 'getItem').and.returnValue('username'));

    beforeEach(() => {
      fixture = TestBed.createComponent(QueryCreationComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize fields successfully', () => {
      expect(component.isPublic).toEqual(true);
    });

    it('should redirect to the query page when created a new query', () => {
      const mockQuery = { title: 'title', subtitle: 'subtitle', description: 'description' };
      component.queryFormGroup.patchValue(mockQuery);

      queryServiceStub.createQuery.and.returnValue(of({ id: 0} as IQuery));
      const navigateByUrlSpy = spyOn(TestBed.inject(Router), 'navigateByUrl');

      component.onSubmit();

      const expectedQuery = component.queryFormGroup.getRawValue() as IQuery;
      expectedQuery.username = 'username';

      expect(queryServiceStub.createQuery).toHaveBeenCalledWith(undefined, expectedQuery, true);
      expect(navigateByUrlSpy).toHaveBeenCalledWith(`/query/0`);
      expect(component.queryError).toEqual('');
    });

    it('should set an error message when failed to create a query', () => {
      const mockQuery = { title: 'title', subtitle: 'subtitle', description: 'description' };
      component.queryFormGroup.patchValue(mockQuery);

      queryServiceStub.createQuery.and.returnValue(throwError('Error'));
      const navigateByUrlSpy = spyOn(TestBed.inject(Router), 'navigateByUrl');

      component.onSubmit();

      const expectedQuery = component.queryFormGroup.getRawValue() as IQuery;
      expectedQuery.username = 'username';

      expect(queryServiceStub.createQuery).toHaveBeenCalledWith(undefined, expectedQuery, true);
      expect(navigateByUrlSpy).not.toHaveBeenCalledWith(`/query/0`);
      expect(component.queryError).toEqual('Failed to create the query; please try again later');
    });
  });

  describe('testing when route failed to resolve', () => {
    const activatedRouteStub = {
      data: throwError('Error'),
      snapshot: {
        paramMap: {
          get: (key: string) => undefined
        }
      }};

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ QueryCreationComponent ],
        imports: [
          QueryModule,
          RouterTestingModule
        ],
        providers: [
          { provide: QueryService, useValue: queryServiceStub },
          { provide: ActivatedRoute, useValue: activatedRouteStub }
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => spyOn(localStorage, 'getItem').and.returnValue('username'));

    beforeEach(() => {
      fixture = TestBed.createComponent(QueryCreationComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should set an error message when route failed to resolve', () => {
      expect(component.isPublic).toEqual(false);
      expect(component.queryError).toEqual('Error');
    });
  });
});
