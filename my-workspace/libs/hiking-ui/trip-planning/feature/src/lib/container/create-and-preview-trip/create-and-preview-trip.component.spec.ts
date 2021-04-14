import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAndPreviewTripComponent } from './create-and-preview-trip.component';

describe('CreateAndPreviewTripComponent', () => {
  let component: CreateAndPreviewTripComponent;
  let fixture: ComponentFixture<CreateAndPreviewTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAndPreviewTripComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAndPreviewTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
