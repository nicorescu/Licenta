import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hk-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input()
  routerLink: string;
  @Input()
  leftText: string;
  @Input()
  rightText: string;

  constructor() { }

  ngOnInit(): void {
  }

}
