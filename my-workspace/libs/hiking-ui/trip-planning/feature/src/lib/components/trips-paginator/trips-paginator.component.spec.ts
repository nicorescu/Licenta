import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsPaginatorComponent } from './trips-paginator.component';

describe('TripsPaginatorComponent', () => {
  let component: TripsPaginatorComponent;
  let fixture: ComponentFixture<TripsPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripsPaginatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
