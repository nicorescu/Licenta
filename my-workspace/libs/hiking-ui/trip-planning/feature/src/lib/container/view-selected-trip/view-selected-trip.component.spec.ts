import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSelectedTripComponent } from './view-selected-trip.component';

describe('ViewSelectedTripComponent', () => {
  let component: ViewSelectedTripComponent;
  let fixture: ComponentFixture<ViewSelectedTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSelectedTripComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSelectedTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
