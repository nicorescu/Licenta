import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalRequestsPanelComponent } from './approval-requests-panel.component';

describe('ApprovalRequestsPanelComponent', () => {
  let component: ApprovalRequestsPanelComponent;
  let fixture: ComponentFixture<ApprovalRequestsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalRequestsPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalRequestsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
