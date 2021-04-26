import { Component, Input, OnInit } from '@angular/core';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DOC_ORIENTATION, NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'hk-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {
  @Input()
  photos: string[];
  selectedPhoto: string;
  img: string;
  constructor(private imageService: NgxImageCompressService) {}

  ngOnInit(): void {
    this.selectedPhoto = this.photos[0];
  }
}
