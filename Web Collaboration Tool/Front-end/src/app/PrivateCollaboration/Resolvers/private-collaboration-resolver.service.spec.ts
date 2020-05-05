import { TestBed } from '@angular/core/testing';

import { PrivateCollaborationResolverService } from './private-collaboration-resolver.service';
import {RouterTestingModule} from '@angular/router/testing';
import {PrivateCollaborationService} from '../Services/private-collaboration.service';
import {of, throwError} from 'rxjs';
import {IPrivateCollaboration} from '../Interfaces/IPrivateCollaboration';
import {ActivatedRoute, Router} from '@angular/router';

describe('PrivateCollaborationResolverService', () => {
  let service: PrivateCollaborationResolverService;

  const privateCollaborationServiceStub = jasmine.createSpyObj('PrivateCollaborationService', [ 'getPrivateCollaborationsForUser' ]);

  beforeEach(() => spyOn(localStorage, 'getItem').and.returnValue('username'));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [ { provide: PrivateCollaborationService, useValue: privateCollaborationServiceStub }]
    });
    service = TestBed.inject(PrivateCollaborationResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return private collaborations', () => {
    privateCollaborationServiceStub.getPrivateCollaborationsForUser.and.returnValue(of([ {} as IPrivateCollaboration ]));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(collaborations => {
        expect(privateCollaborationServiceStub.getPrivateCollaborationsForUser).toHaveBeenCalledWith('username');
        expect(collaborations.length).toEqual(1);
      }, () => fail('Should have succeeded!'));
  });

  it('should return an error message when failed to retrieve collaborations', () => {
    privateCollaborationServiceStub.getPrivateCollaborationsForUser.and.returnValue(throwError('Error'));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(() => fail('Should have failed!'), error => expect(error).toEqual('Failed to retrieve private collaboration data; please try again later'));
  });
});
