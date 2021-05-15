import { TestBed } from '@angular/core/testing';

import { ViewSelectedTripGUard } from './view-selected-trip.guard';

describe('SelectedTripGuard', () => {
  let guard: ViewSelectedTripGUard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ViewSelectedTripGUard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
