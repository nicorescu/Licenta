import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';

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
  scale = 1;
  transform: ImageTransform = {};

  saveClicked = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  ngOnInit(): void {
    this.imageChangedEvent = this.data.imageChangedEvent;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImageUrl = event.base64;
  }

  zoomOut() {
    this.scale -= 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  zoomIn() {
    this.scale += 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  reset() {
    this.scale = 1;
    this.transform = {};
  }

  save() {
    this.saveClicked.emit(this.base64ToFile(this.croppedImageUrl));
  }

  base64ToFile(base64Image: string): File {
    const split = base64Image.split(',');
    const type = split[0].replace('data:', '').replace(';base64', '');
    const byteString = atob(split[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type });
    return <File>blob;
  }
}
