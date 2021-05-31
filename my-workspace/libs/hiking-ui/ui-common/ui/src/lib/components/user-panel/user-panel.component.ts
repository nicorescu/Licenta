import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '@hkworkspace/shared/app-authentication/data-access';

@Component({
  selector: 'hk-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
})
export class UserPanelComponent implements OnInit {
  @Input() user: User;
  @Output() logout = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  logoutClicked() {
    this.logout.emit(true);
  }

  buildPictureUrl(base64: string) {
    return base64
      ? `data:image/png;base64,${base64}`
      : '/images/default_profile_picture.png';
  }
}
