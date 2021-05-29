import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageActionsComponent } from './image-actions.component';

describe('AccountActionsComponent', () => {
  let component: ImageActionsComponent;
  let fixture: ComponentFixture<ImageActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageActionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
