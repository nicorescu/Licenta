import { TestBed } from '@angular/core/testing';

import { TripPreviewGuard } from './trip-preview.guard';

describe('TripPreviewGuard', () => {
  let guard: TripPreviewGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TripPreviewGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
