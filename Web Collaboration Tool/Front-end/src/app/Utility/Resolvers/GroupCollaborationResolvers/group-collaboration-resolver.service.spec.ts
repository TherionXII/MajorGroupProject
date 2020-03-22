import { TestBed } from '@angular/core/testing';

import { GroupCollaborationResolverService } from './group-collaboration-resolver.service';

describe('GroupCollaborationResolverService', () => {
  let service: GroupCollaborationResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupCollaborationResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
