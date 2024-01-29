import { TestBed } from '@angular/core/testing';

import { RegularUserGuard } from './regular-user.guard';

describe('RegularUserGuard', () => {
  let guard: RegularUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RegularUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
