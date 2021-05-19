import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripPlacesComponent } from './trip-attractions.component';

describe('TripPlacesComponent', () => {
  let component: TripPlacesComponent;
  let fixture: ComponentFixture<TripPlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TripPlacesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
