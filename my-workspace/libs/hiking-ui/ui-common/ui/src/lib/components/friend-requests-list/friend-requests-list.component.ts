import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ActionsFriendRequest,
  UserService,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import {
  AppAuthenticateFacade,
  User,
} from '@hkworkspace/shared/app-authentication/data-access';
import { ToastService } from '@hkworkspace/utils';
import { TranslocoService } from '@ngneat/transloco';
import { of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'hk-friend-requests-list',
  templateUrl: './friend-requests-list.component.html',
  styleUrls: ['./friend-requests-list.component.scss'],
})
export class FriendRequestsListComponent implements OnInit {
  @Input()
  requesters: User[];

  @Output()
  requestsListChanged = new EventEmitter();

  approveModel: ActionsFriendRequest;
  constructor(
    private userService: UserService,
    private authFacade: AppAuthenticateFacade,
    private toastrService: ToastService,
    private translocoService: TranslocoService
  ) {}

  ngOnInit(): void {}

  approveRequest(requester: User) {
    this.authFacade.sessionToken$
      .pipe(
        take(1),
        switchMap((token) => {
          this.approveModel = {
            requestedUserId: token.loggedInId,
            requesterUserId: requester.id,
          };
          return this.userService.approveFriendRequest(this.approveModel);
        }),
        switchMap(() => {
          return this.userService.removeFriendRequest(this.approveModel);
        }),
        catchError((err) => {
          this.toastrService.error(
            this.translocoService.translate(
              'header.friendsPanel.errors.anErrorHasOccured'
            )
          );
          return of();
        })
      )
      .subscribe((res: boolean) => {
        this.requestsListChanged.emit();
        this.toastrService.success(
          this.translocoService.translate(
            'header.friendsPanel.friendRequestApproved'
          )
        );
      });
  }

  removeRequest(requester: User) {
    this.authFacade.sessionToken$
      .pipe(
        switchMap((token) => {
          this.approveModel = {
            requestedUserId: token.loggedInId,
            requesterUserId: requester.id,
          };
          return this.userService.removeFriendRequest(this.approveModel);
        })
      )
      .pipe(
        take(1),
        catchError((err) => {
          this.toastrService.error(
            this.translocoService.translate(
              'header.friendsPanel.errors.anErrorHasOccured'
            )
          );
          return of();
        })
      )
      .subscribe();
  }
}
