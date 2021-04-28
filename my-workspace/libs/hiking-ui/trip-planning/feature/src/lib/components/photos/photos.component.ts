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
    // this.images = this.photos.map((x, index) => {
    //   return new Image(index, { img: x, extUrl: 'http://wwww.google.com' });
    // });
    // console.log(this.photos[0])
  }
}
