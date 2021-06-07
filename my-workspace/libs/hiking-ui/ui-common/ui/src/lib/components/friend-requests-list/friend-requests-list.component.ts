import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FriendRequest,
  SignalRService,
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
import {
  catchError,
  concatMap,
  switchMap,
  take,
  takeWhile,
} from 'rxjs/operators';

@Component({
  selector: 'hk-friend-requests-list',
  templateUrl: './friend-requests-list.component.html',
  styleUrls: ['./friend-requests-list.component.scss'],
})
export class FriendRequestsListComponent implements OnInit, OnDestroy {
  @Input()
  requesters: User[];

  @Output()
  requestsListChanged = new EventEmitter();
  sessionToken: SessionToken;

  approveModel: FriendRequest;
  alive = true;
  constructor(
    private userService: UserService,
    private authFacade: AppAuthenticateFacade,
    private toastrService: ToastService,
    private translocoService: TranslocoService,
    private signalRService: SignalRService
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

  approveRequest(requester: User) {
    this.approveModel = {
      requestedUserId: this.sessionToken.loggedInId,
      requesterUserId: requester.id,
    };

    this.userService
      .approveFriendRequest(this.approveModel)
      .pipe(
        take(1),
        switchMap(() => {
          return this.userService.removeFriendRequest(this.approveModel);
        }),
        catchError(() => {
          this.toastrService.error(
            this.translocoService.translate(
              'header.friendsPanel.errors.anErrorHasOccured'
            )
          );
          return of();
        })
      )
      .subscribe(() => {
        this.requestsListChanged.emit();
        this.signalRService.notifyFriendRequestApproved(
          requester.id,
          this.sessionToken.loggedInId,
          `${this.sessionToken.firstName} ${this.sessionToken.lastName}`
        );
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
        take(1),
        switchMap((token) => {
          this.approveModel = {
            requestedUserId: token.loggedInId,
            requesterUserId: requester.id,
          };
          return this.userService.removeFriendRequest(this.approveModel);
        }),
        catchError(() => {
          this.toastrService.error(
            this.translocoService.translate(
              'header.friendsPanel.errors.anErrorHasOccured'
            )
          );
          return of();
        })
      )
      .subscribe(() => {
        this.requestsListChanged.emit();
      });
  }
}
