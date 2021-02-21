import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hk-link-image',
  templateUrl: './link-image.component.html',
  styleUrls: ['./link-image.component.scss']
})
export class LinkImageComponent implements OnInit {

  @Input() imageTitle;
  @Input() imageUrl;

  constructor() { }

  ngOnInit(): void {
  }

}
