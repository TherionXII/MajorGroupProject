import { TestBed } from '@angular/core/testing';

import { PrivateCollaborationRequestResolverService } from './private-collaboration-request-resolver.service';
import {of, throwError} from 'rxjs';
import {IPrivateCollaborationRequest} from '../../Utility/Interfaces/IPrivateCollaborationRequest';
import {ActivatedRoute, Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {PrivateCollaborationService} from '../Services/private-collaboration.service';

describe('PrivateCollaborationRequestResolverService', () => {
  let service: PrivateCollaborationRequestResolverService;

  const privateCollaborationServiceStub = jasmine.createSpyObj('RequestService', [ 'getPrivateCollaborationRequestsForUser' ]);

  beforeEach(() => spyOn(localStorage, 'getItem').and.returnValue('username'));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [ { provide: PrivateCollaborationService, useValue: privateCollaborationServiceStub }]
    });
    service = TestBed.inject(PrivateCollaborationRequestResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return collaboration requests', () => {
    privateCollaborationServiceStub.getPrivateCollaborationRequestsForUser.and.returnValue(of([ {} as IPrivateCollaborationRequest ]));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(requests => {
        expect(privateCollaborationServiceStub.getPrivateCollaborationRequestsForUser).toHaveBeenCalledWith('username');
        expect(requests.length).toEqual(1);
      }, () => fail('Should have succeeded!'));
  });

  it('should return an error when failed to retrieve requests', () => {
    privateCollaborationServiceStub.getPrivateCollaborationRequestsForUser.and.returnValue(throwError('Error'));

    service.resolve(TestBed.inject(ActivatedRoute).snapshot, TestBed.inject(Router).routerState.snapshot)
      .subscribe(() => fail('Should have failed!'), error => expect(error).toEqual('Failed to retrieve collaboration data; please try again later'));
  });
});
