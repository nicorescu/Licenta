import { Component, OnInit } from '@angular/core';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'hk-chats-panel',
  templateUrl: './chats-panel.component.html',
  styleUrls: ['./chats-panel.component.scss'],
})
export class ChatsPanelComponent implements OnInit {

  faCommentAlt = faCommentAlt;

  constructor() {}

  data: any[];
  ngOnInit(): void {
    this.data = [
      { id: 1, string: 's' },
      { id: 2, string: '3' },
    ];
  }
}
