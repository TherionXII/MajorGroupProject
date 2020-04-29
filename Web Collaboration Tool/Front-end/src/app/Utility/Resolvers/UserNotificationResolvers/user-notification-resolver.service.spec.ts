import { TestBed } from '@angular/core/testing';

import { UserNotificationResolverService } from './user-notification-resolver.service';

describe('UserNotificationResolverService', () => {
  let service: UserNotificationResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserNotificationResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
