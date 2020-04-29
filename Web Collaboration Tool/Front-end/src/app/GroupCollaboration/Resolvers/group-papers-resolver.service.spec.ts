import { TestBed } from '@angular/core/testing';

import { GroupPapersResolverService } from './group-papers-resolver.service';

describe('GroupPapersResolverService', () => {
  let service: GroupPapersResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupPapersResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
