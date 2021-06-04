import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditableField } from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { User } from '@hkworkspace/shared/app-authentication/data-access';
import { ToastService } from '@hkworkspace/utils';
import { TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { EditFieldComponent } from '../edit-field/edit-field.component';
import { ImageCropperComponent } from '../image-cropper/image-cropper.component';

export interface DialogData {
  user: User;
  activeLang: string;
}

@Component({
  selector: 'hk-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit, OnDestroy {
  imageSaved = new EventEmitter();
  editableField = EditableField;
  informationSaved = new EventEmitter();
  publicProfile$: BehaviorSubject<boolean>;
  profilePrivacyChanged = new EventEmitter();

  alive = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialog: MatDialog,
    private toastrService: ToastService,
    private translocoService: TranslocoService
  ) {
    this.publicProfile$ = new BehaviorSubject(data.user.publicProfile);
  }

  ngOnInit(): void {
    this.publicProfile$.pipe(takeWhile(() => this.alive)).subscribe((val) => {
      console.log('val changed', val);
      this.profilePrivacyChanged.emit(val);
    });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  imagePicked(event) {
    const dialogRef = this.dialog.open(ImageCropperComponent, {
      minWidth: '400px',
      maxHeight: '95vh',
      maxWidth: '90vw',
      data: { imageChangedEvent: event },
      disableClose: true,
    });

    dialogRef.componentInstance.saveClicked.subscribe((image: File) => {
      this.imageSaved.emit(image);
    });
  }

  userUpdated() {
    this.toastrService.success(
      this.translocoService.translate('myAccount.editProfile.editSuccess')
    );
    this.informationSaved.emit();
  }

  public get pictureUrl() {
    return this.data?.user?.profilePicUrl
      ? `data:image/png;base64,${this.data?.user?.profilePicUrl}`
      : '/images/default_profile_picture.png';
  }

  public get publicProfile() {
    return this.publicProfile$.value;
  }

  public set publicProfile(v: boolean) {
    this.publicProfile$.next(v);
  }
}
