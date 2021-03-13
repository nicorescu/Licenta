import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInContainerComponent } from './sign-in-container.component';

describe('SignInContainerComponent', () => {
  let component: SignInContainerComponent;
  let fixture: ComponentFixture<SignInContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
