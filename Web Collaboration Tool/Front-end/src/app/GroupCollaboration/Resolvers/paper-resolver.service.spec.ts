import { TestBed } from '@angular/core/testing';

import { PaperResolverService } from './paper-resolver.service';
import {IPaper} from '../../Paper/Interfaces/IPaper';
import {RouterTestingModule} from '@angular/router/testing';
import {PaperService} from '../../Paper/Services/paper.service';
import {ActivatedRoute, Router} from '@angular/router';
import {of, throwError} from 'rxjs';

describe('PaperResolverService', () => {
  let service: PaperResolverService;

  const mockPaper = {} as IPaper;
  const paperServiceStub = jasmine.createSpyObj('PaperService', [ 'getPaper' ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [ { provide: PaperService, useValue: paperServiceStub }]
    });
    service = TestBed.inject(PaperResolverService);
  });

  beforeEach(() => spyOn(TestBed.inject(ActivatedRoute).snapshot.paramMap, 'get').and.returnValue('0'));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return valid data when successful', () => {
    paperServiceStub.getPaper.and.returnValue(of(mockPaper));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(data => {
        expect(paperServiceStub.getPaper).toHaveBeenCalledWith('0');

        expect(data).toEqual(mockPaper);
      }, () => fail('Should have succeeded!'));
  });

  it('should return an error when failed', () => {
    paperServiceStub.getPaper.and.returnValue(throwError('Error'));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(() => fail('Should have failed!'),
                 error => expect(error).toEqual('Failed to retrieve paper data; please try again later'));
  });
});
