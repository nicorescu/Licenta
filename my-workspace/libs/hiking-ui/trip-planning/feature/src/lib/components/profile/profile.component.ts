import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { UserService } from '@hkworkspace/hiking-ui/trip-planning/data-access';
import {
  AppAuthenticateFacade,
  SessionToken,
  User,
} from '@hkworkspace/shared/app-authentication/data-access';
import { TranslocoService } from '@ngneat/transloco';
import { concatMap, take, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'hk-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChild(MatTabGroup, { static: false }) tabGroup: MatTabGroup;

  @Input()
  user: User;
  @Input()
  isFriend: boolean;
  @Input()
  friends: User[];

  sessionToken: SessionToken;
  alive = true;
  @Output()
  changePasswordClicked = new EventEmitter();
  @Output()
  editProfileClicked = new EventEmitter();
  @Output()
  imageSaved = new EventEmitter();
  @Output()
  removeImageConfirmed = new EventEmitter();
  @Output()
  selectedTabChanged = new EventEmitter();
  @Output()
  viewTripClicked = new EventEmitter();

  constructor(
    private authFacade: AppAuthenticateFacade,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authFacade.sessionToken$
      .pipe(takeWhile(() => this.alive))
      .subscribe((token) => {
        this.sessionToken = token;
      });
  }
  ngOnDestroy(): void {
    this.alive = false;
  }

  changePassword() {
    this.changePasswordClicked.emit();
  }
  editProfile() {
    this.editProfileClicked.emit();
  }

  saveProfilePicture(img) {
    this.imageSaved.emit(img);
  }

  removeProfilePic() {
    this.removeImageConfirmed.emit();
  }

  viewTrip(tripId: string) {
    this.viewTripClicked.emit(tripId);
  }

  tabChanged(event: MatTabChangeEvent) {
    this.selectedTabChanged.emit(event);
  }

  onFriendRequested() {
    this.userService
      .sendFriendRequest({
        requestedUserId: this.user.id,
        requesterUserId: this.sessionToken.loggedInId,
      })
      .pipe(
        take(1),
        concatMap(() => {
          return this.userService.getUserById(this.user.id);
        })
      )
      .subscribe((user) => {
        this.user = user;
      });
  }

  onUnfriend() {
    this.userService
      .removeFriend(this.sessionToken.loggedInId, this.user.id)
      .pipe(
        take(1),
        concatMap(() => {
          return this.userService.getUserById(this.user.id);
        })
      )
      .subscribe((user) => {
        this.user = user;
      });
  }

  onCancelFriendRequest() {
    this.userService
      .removeFriendRequest({
        requestedUserId: this.user.id,
        requesterUserId: this.sessionToken.loggedInId,
      })
      .pipe(
        take(1),
        concatMap(() => {
          return this.userService.getUserById(this.user.id);
        })
      )
      .subscribe((user) => {
        this.user = user;
      });
  }

  public get isOwnProfile() {
    return this.user?.id === this.sessionToken?.loggedInId;
  }

  public get isFriendRequested() {
    return (
      this.user?.friendRequests.indexOf(this.sessionToken?.loggedInId) >= 0
    );
  }
}
