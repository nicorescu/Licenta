import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';

export interface DialogData {
  imageChangedEvent: any;
}

@Component({
  selector: 'hk-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss'],
})
export class ImageCropperComponent implements OnInit {
  imageChangedEvent: any;
  croppedImageUrl: string;
  showCropper = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  ngOnInit(): void {
    this.imageChangedEvent = this.data.imageChangedEvent;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImageUrl = event.base64;
  }

  base64ToFile(base64Image: string) {
    const split = base64Image.split(',');
    const type = split[0].replace('data:', '').replace(';base64', '');
    const byteString = atob(split[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type });
  }
}
