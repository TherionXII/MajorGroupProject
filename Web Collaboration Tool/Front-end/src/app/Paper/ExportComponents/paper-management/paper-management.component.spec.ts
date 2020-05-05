import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperManagementComponent } from './paper-management.component';
import {PaperModule} from '../../paper.module';
import {RouterTestingModule} from '@angular/router/testing';
import {IPaper} from '../../Interfaces/IPaper';
import {of, throwError} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {PaperService} from '../../Services/paper.service';

describe('PaperManagementComponent', () => {
  let component: PaperManagementComponent;
  let fixture: ComponentFixture<PaperManagementComponent>;

  describe(' testing when route resolved successfully', () => {
    const mockPapers = [ { id: 0, paperName: 'PaperName1' } as IPaper, { id: 1, paperName: 'PaperName2' } as IPaper ];
    const activatedRouteStub = { data: of({ papers: mockPapers } ), snapshot: { paramMap: { get: (key: string) => key } } };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ PaperManagementComponent ],
        imports: [
          PaperModule,
          RouterTestingModule
        ],
        providers: [
          { provide: ActivatedRoute, useValue: activatedRouteStub },
          { provide: PaperService, useValue: {} }
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(PaperManagementComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize fields successfully', () => {
      expect(component.papers.length).toEqual(2);
      expect(component.resolverError).toEqual('');
    });
  });

  describe(' testing when route failed to resolve', () => {
    const activatedRouteStub = { data: throwError('Error'), snapshot: { paramMap: { get: (key: string) => key } } };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ PaperManagementComponent ],
        imports: [
          PaperModule,
          RouterTestingModule
        ],
        providers: [
          { provide: ActivatedRoute, useValue: activatedRouteStub },
          { provide: PaperService, useValue: {} }
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(PaperManagementComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should default-initialize the fields', () => {
      expect(component.papers.length).toEqual(0);
      expect(component.resolverError).toEqual('Error');
    });
  });
});
