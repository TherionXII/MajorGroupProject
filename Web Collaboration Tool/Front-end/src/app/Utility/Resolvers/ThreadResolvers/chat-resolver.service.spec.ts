import { TestBed } from '@angular/core/testing';

import { ChatResolverService } from './chat-resolver.service';

describe('PrivateCollaborationChatResolverService', () => {
  let service: ChatResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
