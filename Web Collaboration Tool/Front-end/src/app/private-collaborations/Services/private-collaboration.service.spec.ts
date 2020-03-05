import { TestBed } from '@angular/core/testing';

import { PrivateCollaborationService } from './private-collaboration.service';

describe('PrivateCollaborationService', () => {
  let service: PrivateCollaborationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivateCollaborationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
