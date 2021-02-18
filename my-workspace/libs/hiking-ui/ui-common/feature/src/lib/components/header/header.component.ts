import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'hk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  authenticated: boolean;
  
  user: {email: 'Nicorescu@gmail.com'};

  constructor() { }

  ngOnInit() {
  }

}
