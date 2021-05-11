import { TestBed } from '@angular/core/testing';

import { TripsListGuard } from './trips-list.guard';

describe('TripsListGuard', () => {
  let guard: TripsListGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TripsListGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
