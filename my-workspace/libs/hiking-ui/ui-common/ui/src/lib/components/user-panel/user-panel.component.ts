import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'hk-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {

  @Input() firstName;
  @Output() logout = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
  }

  logoutClicked(){
    this.logout.emit(true);
  }
}
