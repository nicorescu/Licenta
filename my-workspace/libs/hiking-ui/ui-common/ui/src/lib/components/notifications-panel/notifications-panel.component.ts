import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hk-notifications-panel',
  templateUrl: './notifications-panel.component.html',
  styleUrls: ['./notifications-panel.component.scss'],
})
export class NotificationsPanelComponent implements OnInit {
  constructor() {}
  data: any[];
  ngOnInit(): void {
    this.data = [
      { id: 1, string: 's' },
      { id: 2, string: '3' },
      { id: 1, string: 's' },
      { id: 2, string: '3' },
      { id: 1, string: 's' },
      { id: 2, string: '3' },
      { id: 1, string: 's' },
      { id: 2, string: '3' },
      { id: 1, string: 's' },
      { id: 2, string: '3' },
      { id: 1, string: 's' },
      { id: 2, string: '3' },
      { id: 1, string: 's' },
      { id: 2, string: '3' },
      { id: 1, string: 's' },
      { id: 2, string: '3' },
      { id: 1, string: 's' },
      { id: 2, string: '3' },
    ];
  }
}
