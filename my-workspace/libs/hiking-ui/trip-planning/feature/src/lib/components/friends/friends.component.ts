import { Component, OnInit, Input } from '@angular/core';
import { User } from '@hkworkspace/shared/app-authentication/data-access';

@Component({
  selector: 'hk-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  @Input()
  friends: User[];

  constructor() {}

  ngOnInit(): void {}
}
