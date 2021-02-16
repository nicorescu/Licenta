import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hk-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {

  @Input()
  menuItems: any;

  @Input()
  menuMode: string;

  @Input()
  user: any;

  constructor() {}

  ngOnInit(): void {
  }

}
