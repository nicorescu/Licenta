import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendOptionsComponent } from './friend-options.component';

describe('FriendOptionsComponent', () => {
  let component: FriendOptionsComponent;
  let fixture: ComponentFixture<FriendOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
