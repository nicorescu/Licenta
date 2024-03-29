import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTripsComponent } from './user-trips.component';

describe('MyTripsComponent', () => {
  let component: UserTripsComponent;
  let fixture: ComponentFixture<UserTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserTripsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
