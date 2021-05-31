import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageCropperComponent } from '../image-cropper/image-cropper.component';
@Component({
  selector: 'hk-image-actions',
  templateUrl: './image-actions.component.html',
  styleUrls: ['./image-actions.component.scss'],
})
export class ImageActionsComponent implements OnInit {
  @Input()
  imageUrl: string;

  @Output()
  imageSaved = new EventEmitter();
  @Output()
  removeImageConfirmed = new EventEmitter();
  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {}

  imagePicked(event) {
    this.openDialog(event);
  }

  openDialog(event) {
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

  openConfirmDialog(templateRef) {
    this.dialog.open(templateRef, {
      disableClose: true,
    });
  }

  removeProfilePicture() {
    this.removeImageConfirmed.emit();
  }

  public get pictureUrl() {
    return this.imageUrl
      ? `data:image/png;base64,${this.imageUrl}`
      : '/images/default_profile_picture.png';
  }
}
