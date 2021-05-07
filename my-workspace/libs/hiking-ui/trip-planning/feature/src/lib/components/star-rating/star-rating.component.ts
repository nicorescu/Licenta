import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'hk-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {

  @Input()
  rating: number;
  @Input()
  totalStars: number;
  @Input()
  checkedColor: string;
  @Input()
  uncheckedColor: string;
  @Input()
  size: string;
  @Input()
  readOnly: boolean;
  @Output()
  ratingEmitter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onRate(stars: number){
    this.ratingEmitter.emit(stars);
  }

}
