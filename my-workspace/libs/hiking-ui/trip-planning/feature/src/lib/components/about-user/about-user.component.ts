import { Component, OnInit, Input } from '@angular/core';
import { User } from '@hkworkspace/shared/app-authentication/data-access';

@Component({
  selector: 'hk-about-user',
  templateUrl: './about-user.component.html',
  styleUrls: ['./about-user.component.scss'],
})
export class AboutUserComponent implements OnInit {
  @Input()
  user: User;
  constructor() {}

  ngOnInit(): void {}
}
