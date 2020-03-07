import { TestBed } from '@angular/core/testing';

import { PrivateCollaborationChatResolverService } from './private-collaboration-chat-resolver.service';

describe('PrivateCollaborationChatResolverService', () => {
  let service: PrivateCollaborationChatResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivateCollaborationChatResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
