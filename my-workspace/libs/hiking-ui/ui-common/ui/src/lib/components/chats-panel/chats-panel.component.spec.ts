import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsPanelComponent } from './chats-panel.component';

describe('ChatsPanelComponent', () => {
  let component: ChatsPanelComponent;
  let fixture: ComponentFixture<ChatsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatsPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
