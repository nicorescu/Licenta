import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import {
  PlanningFacade,
  UserService,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import {
  AppAuthenticateFacade,
  SessionToken,
  User,
} from '@hkworkspace/shared/app-authentication/data-access';
import { ToastService } from '@hkworkspace/utils';
import { TranslocoService } from '@ngneat/transloco';
import { of } from 'rxjs';
import { catchError, switchMap, take, takeWhile } from 'rxjs/operators';
import { ProfileComponent } from '../../components/profile/profile.component';

@Component({
  selector: 'hk-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss'],
})
export class PublicProfileComponent implements OnInit, OnDestroy {
  @ViewChild(ProfileComponent, { static: true })
  profileComponent: ProfileComponent;

  user: User;
  sessionToken: SessionToken;
  alive = true;
  friends: User[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private authFacade: AppAuthenticateFacade,
    private planningFacade: PlanningFacade,
    private translocoService: TranslocoService
  ) {
    this.authFacade.sessionToken$
      .pipe(takeWhile(() => this.alive))
      .subscribe((token) => {
        this.sessionToken = token;
      });
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        takeWhile(() => this.alive),
        switchMap((params) => {
          return this.userService.getUserById(params.userId);
        }),
        catchError(() => {
          this.translocoService.translate('profile.errors.anErrorHasOccured');
          return of();
        })
      )
      .subscribe((user: User) => {
        this.user = user;
        this.profileComponent.tabGroup.selectedIndex = 0;
      });

    this.userService.friendRequestApproved
      .pipe(
        takeWhile(() => this.alive),
        switchMap((id) => {
          if (id === this.user.id) {
            return this.userService.getUserById(id);
          }
        })
      )
      .subscribe((user: User) => {
        this.user = user;
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  tabChanged(event: MatTabChangeEvent) {
    if (event.index === 1) {
      this.userService
        .getUserFriends(this.user.id)
        .pipe(take(1))
        .subscribe((users) => {
          this.friends = users;
        });
    }
  }

  viewTrip(tripId: string) {
    this.planningFacade.clearState();
    this.planningFacade.selectTrip(tripId);
  }
}
