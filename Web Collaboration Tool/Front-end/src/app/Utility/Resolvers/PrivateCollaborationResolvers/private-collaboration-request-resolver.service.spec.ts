import { TestBed } from '@angular/core/testing';

import { PrivateCollaborationRequestResolverService } from './private-collaboration-request-resolver.service';

describe('PrivateCollaborationRequestResolverService', () => {
  let service: PrivateCollaborationRequestResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivateCollaborationRequestResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
