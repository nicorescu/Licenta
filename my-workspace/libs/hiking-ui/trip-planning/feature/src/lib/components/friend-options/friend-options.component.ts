import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import {
  faArrowLeft,
  faUserCheck,
  faUserTimes,
  faUserClock,
} from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs/operators';

@Component({
  selector: 'hk-friend-options',
  templateUrl: './friend-options.component.html',
  styleUrls: ['./friend-options.component.scss'],
})
export class FriendOptionsComponent {
  @Input()
  isFriend: boolean;
  @Input()
  isFriendRequested: boolean;
  @Output()
  friendRequestedEmitter = new EventEmitter();
  @Output()
  unfriendEmitter = new EventEmitter();
  @Output()
  cancelRequestEmitter = new EventEmitter();
  faArrowLeft = faArrowLeft;
  faUserCheck = faUserCheck;
  faUserTimes = faUserTimes;
  faUserClock = faUserClock;
  constructor() {}

  sendFriendRequest() {
    this.friendRequestedEmitter.emit();
  }

  unfriend() {
    this.unfriendEmitter.emit();
  }

  cancelRequest() {
    this.cancelRequestEmitter.emit();
  }
}
