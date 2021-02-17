import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'hk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  authenticated = true;
  user: {email: 'Nicorescu@gmail.com'};

  constructor() { }

  ngOnInit() {
  }

}
