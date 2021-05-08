import { Component, Input, OnInit } from '@angular/core';
import { Image } from '@ks89/angular-modal-gallery';

@Component({
  selector: 'hk-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {
  @Input()
  photos: string[];
  images: Image[];

  constructor() {}

  ngOnInit(): void {
  }
}
