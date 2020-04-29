import { TestBed } from '@angular/core/testing';

import { PrivateCollaborationResolverService } from './private-collaboration-resolver.service';

describe('PrivateCollaborationResolverService', () => {
  let service: PrivateCollaborationResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivateCollaborationResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
