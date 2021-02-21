import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkImageComponent } from './link-image.component';

describe('LinkImageComponent', () => {
  let component: LinkImageComponent;
  let fixture: ComponentFixture<LinkImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
