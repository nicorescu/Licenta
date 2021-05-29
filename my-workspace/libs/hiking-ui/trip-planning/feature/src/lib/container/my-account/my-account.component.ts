import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '@hkworkspace/hiking-ui/trip-planning/data-access';
import {
  AppAuthenticateFacade,
  SessionToken,
  User,
} from '@hkworkspace/shared/app-authentication/data-access';
import { switchMap, take, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit, OnDestroy {
  alive = true;
  user: User;

  constructor(
    private authFacade: AppAuthenticateFacade,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authFacade.sessionToken$
      .pipe(
        takeWhile(() => this.alive),
        switchMap((token) => {
          return this.userService.getUserById(token.loggedInId);
        })
      )
      .subscribe((user) => {
        this.user = user;
        console.log(this.user);
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  imgClick() {
    console.log('clicked');
  }

  buildPictureUrl(base64: string) {
    return base64
      ? `data:image/png;base64,${base64}`
      : '/images/default_profile_picture.png';
  }
}
