import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripAttractionsComponent } from './trip-attractions.component';

describe('TripAttractionsComponent', () => {
  let component: TripAttractionsComponent;
  let fixture: ComponentFixture<TripAttractionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripAttractionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripAttractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
