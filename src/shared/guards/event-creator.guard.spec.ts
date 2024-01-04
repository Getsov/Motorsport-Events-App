import { TestBed } from '@angular/core/testing';

import { EventCreatorGuard } from './event-creator.guard';

describe('EventCreatorGuard', () => {
  let guard: EventCreatorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EventCreatorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
