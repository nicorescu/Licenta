import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavigationInnerToolbarComponent } from './side-navigation-inner-toolbar.component';

describe('SideNavigationInnerToolbarComponent', () => {
  let component: SideNavigationInnerToolbarComponent;
  let fixture: ComponentFixture<SideNavigationInnerToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideNavigationInnerToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavigationInnerToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
