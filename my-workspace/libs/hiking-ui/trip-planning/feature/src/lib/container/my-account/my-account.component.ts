import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
import { EditProfileComponent } from '../../components/edit-profile/edit-profile.component';

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
  editDialogRef: MatDialogRef<EditProfileComponent>;
  passwordDialogRef: MatDialogRef<any>;
  passwordForm: FormGroup;

  constructor(
    private authFacade: AppAuthenticateFacade,
    private userService: UserService,
    private toastrService: ToastService,
    private translocoService: TranslocoService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activeLang = this.translocoService.getActiveLang();

    this.fetchUser();
  }

  changePasswordClicked(template) {
    this.buildPasswordForm();
    this.passwordDialogRef = this.dialog.open(template, {
      minWidth: '450px',
    });
  }

  buildPasswordForm() {
    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  tryUpdatePassword() {
    if (this.passwordForm.invalid) {
      return;
    }
    this.userService
      .updatePassword(
        this.sessionToken.loggedInId,
        this.passwordForm.getRawValue()
      )
      .pipe(
        take(1),
        catchError((err) => {
          if (err.status === 401) {
            this.oldPassword.setErrors({ wrongPassword: true });
          }
          return of();
        })
      )
      .subscribe(() => {
        this.passwordDialogRef.close();
        this.toastrService.success(
          this.translocoService.translate('myAccount.passwordUpdatedSuccess')
        );
      });
  }

  fetchUser(): void {
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
        this.editDialogRef.componentInstance.data = {
          user: user,
          activeLang: this.activeLang,
        };
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

  openEditDialog() {
    this.editDialogRef = this.dialog.open(EditProfileComponent, {
      minWidth: '500px',
      width: '60vw',
      data: {
        user: this.user,
        activeLang: this.activeLang,
      },
      disableClose: true,
    });
    this.editDialogRef.componentInstance.imageSaved
      .pipe(takeWhile(() => this.alive))
      .subscribe((image) => {
        this.saveProfilePicture(image);
      });

    this.editDialogRef.componentInstance.informationSaved
      .pipe(
        takeWhile(() => this.alive),
        switchMap(() => {
          return this.userService.getUserById(this.user.id);
        })
      )
      .subscribe((user) => {
        this.user = user;
        this.editDialogRef.componentInstance.data = {
          user: user,
          activeLang: this.activeLang,
        };
      });
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

  public get oldPassword() {
    return this.passwordForm.controls['oldPassword'];
  }

  public get newPassword() {
    return this.passwordForm.controls['newPassword'];
  }
}
