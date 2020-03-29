import { TestBed } from '@angular/core/testing';

import { ForumResolverService } from './forum-resolver.service';

describe('ForumResolverService', () => {
  let service: ForumResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForumResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
