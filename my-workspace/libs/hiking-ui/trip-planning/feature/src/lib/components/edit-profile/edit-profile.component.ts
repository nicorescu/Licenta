import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '@hkworkspace/shared/app-authentication/data-access';
import { ImageCropperComponent } from '../image-cropper/image-cropper.component';

export interface DialogData {
  user: User;
}

@Component({
  selector: 'hk-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  imageSaved = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  imagePicked(event) {
    const dialogRef = this.dialog.open(ImageCropperComponent, {
      minWidth: '400px',
      maxHeight: '90vh',
      maxWidth: '90vw',
      data: { imageChangedEvent: event },
      disableClose: true,
    });

    dialogRef.componentInstance.saveClicked.subscribe((image: File) => {
      this.imageSaved.emit(image);
    });
  }

  public get pictureUrl() {
    return this.data?.user?.profilePicUrl
      ? `data:image/png;base64,${this.data?.user?.profilePicUrl}`
      : '/images/default_profile_picture.png';
  }
}
