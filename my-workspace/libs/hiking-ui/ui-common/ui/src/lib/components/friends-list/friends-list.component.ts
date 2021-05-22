import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '@hkworkspace/hiking-ui/trip-planning/data-access';
import {
  AppAuthenticateFacade,
  User,
} from '@hkworkspace/shared/app-authentication/data-access';
import { concatMap, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'hk-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss'],
})
export class FriendsListComponent implements OnInit {
  @Input()
  friends: User[];

  constructor() {}

  ngOnInit(): void {}
}
