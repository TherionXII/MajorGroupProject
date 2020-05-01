import { TestBed } from '@angular/core/testing';

import { GroupPapersResolverService } from './group-papers-resolver.service';
import {RouterTestingModule} from '@angular/router/testing';
import {IPaper} from '../../Paper/Interfaces/IPaper';
import {PaperService} from '../../Paper/Services/paper.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Type} from '@angular/core';
import {of, throwError} from 'rxjs';

fdescribe('GroupPapersResolverService', () => {
  let service: GroupPapersResolverService;

  const mockPapers = [ {} as IPaper, {} as IPaper ];
  const paperServiceStub = jasmine.createSpyObj('PaperService', [ 'getPapersForGroup' ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [ { provide: PaperService, useValue: paperServiceStub } ]
    });
    service = TestBed.inject(GroupPapersResolverService);
  });

  beforeEach(() => {
    spyOn(TestBed.inject(ActivatedRoute as Type<ActivatedRoute>).snapshot.paramMap, 'get').and.returnValue('0');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return valid data when successful', () => {
    paperServiceStub.getPapersForGroup.and.returnValue(of(mockPapers));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(data => {
        expect(paperServiceStub.getPapersForGroup).toHaveBeenCalledWith('0');

        expect(data).toEqual(mockPapers);
      }, () => fail('Should have succeeded!'));
  });

  it('should return an error when request failed', () => {
    paperServiceStub.getPapersForGroup.and.returnValue(throwError('Error'));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(() => fail('Should have failed!'),
                 error => expect(error).toEqual('Failed to retrieve exam papers; please try again later'));
  });
});
