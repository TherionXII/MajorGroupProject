import { TestBed } from '@angular/core/testing';

import { PrivateCollaborationStatusResolverService } from './private-collaboration-status-resolver.service';

describe('PrivateCollaborationStatusResolverService', () => {
  let service: PrivateCollaborationStatusResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivateCollaborationStatusResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
