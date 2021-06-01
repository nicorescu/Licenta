import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTripsPaginatorComponent } from './account-trips-paginator.component';

describe('AccountTripsPaginatorComponent', () => {
  let component: AccountTripsPaginatorComponent;
  let fixture: ComponentFixture<AccountTripsPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountTripsPaginatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTripsPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
