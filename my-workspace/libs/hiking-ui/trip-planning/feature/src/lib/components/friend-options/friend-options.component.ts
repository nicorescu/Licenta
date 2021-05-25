import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  faArrowLeft,
  faUserCheck,
  faUserTimes,
  faUserClock,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'hk-friend-options',
  templateUrl: './friend-options.component.html',
  styleUrls: ['./friend-options.component.scss'],
})
export class FriendOptionsComponent implements OnInit {
  @Input()
  isFriend: boolean;
  @Input()
  isFriendRequested: boolean;
  @Output()
  friendRequestedEmitter = new EventEmitter();
  @Output()
  unfriendEmitter = new EventEmitter();
  faArrowLeft = faArrowLeft;
  faUserCheck = faUserCheck;
  faUserTimes = faUserTimes;
  faUserClock = faUserClock;
  constructor() {}

  ngOnInit(): void {}

  sendFriendRequest() {
    this.friendRequestedEmitter.emit();
  }

  unfriend() {
    this.unfriendEmitter.emit();
  }
}
