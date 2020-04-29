import { TestBed } from '@angular/core/testing';

import { PaperResolverService } from './paper-resolver.service';

describe('PaperResolverService', () => {
  let service: PaperResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaperResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
