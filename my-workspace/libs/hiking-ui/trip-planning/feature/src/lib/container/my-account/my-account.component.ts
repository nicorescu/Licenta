import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { UserService } from '@hkworkspace/hiking-ui/trip-planning/data-access';
import {
  AppAuthenticateFacade,
  SessionToken,
  User,
} from '@hkworkspace/shared/app-authentication/data-access';
import { ToastService } from '@hkworkspace/utils';
import { TranslocoService } from '@ngneat/transloco';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  switchMap,
  take,
  takeWhile,
} from 'rxjs/operators';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit, OnDestroy {
  alive = true;
  user: User;
  sessionToken: SessionToken;
  activeLang: string;
  friends: User[];

  constructor(
    private authFacade: AppAuthenticateFacade,
    private userService: UserService,
    private toastrService: ToastService,
    private translocoService: TranslocoService
  ) {}

  ngOnInit(): void {
    this.activeLang = this.translocoService.getActiveLang();

    this.authFacade.sessionToken$
      .pipe(
        takeWhile(() => this.alive),
        switchMap((token) => {
          this.sessionToken = token;
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

  saveProfilePicture(image: File) {
    this.userService
      .addProfilePicture(this.sessionToken.loggedInId, image)
      .pipe(
        take(1),
        concatMap(() => {
          this.userService.userChanged.emit();
          return this.userService.getUserById(this.sessionToken.loggedInId);
        }),
        catchError((err) => {
          console.log(err);
          this.toastrService.error(
            this.translocoService.translate('myAccount.imageChangedFail')
          );
          return of();
        })
      )
      .subscribe((user: User) => {
        this.user = user;
        this.toastrService.success(
          this.translocoService.translate('myAccount.imageChangedSuccess')
        );
      });
  }
  removeProfilePic() {
    this.userService
      .removeProfilePicture(this.sessionToken.loggedInId)
      .pipe(
        take(1),
        concatMap(() => {
          this.userService.userChanged.emit();
          return this.userService.getUserById(this.sessionToken.loggedInId);
        }),
        catchError((err) => {
          console.log(err);
          this.toastrService.error(
            this.translocoService.translate('myAccount.imageRemovedFail')
          );
          return of();
        })
      )
      .subscribe((user: User) => {
        this.user = user;
        this.toastrService.success(
          this.translocoService.translate('myAccount.imageRemovedSuccess')
        );
      });
  }

  test() {
    console.log(this.user.friends);
  }

  tabChanged(event: MatTabChangeEvent) {
    switch (event.index) {
      case 1:
        this.userService
          .getUserFriends(this.sessionToken.loggedInId)
          .pipe(take(1))
          .subscribe((users) => {
            this.friends = users;
          });
        break;
      case 2:
        break;
    }
  }
}
