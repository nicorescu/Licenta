import { Component, OnInit } from '@angular/core';
import {
  AppAuthenticateFacade,
  User,
} from '@hkworkspace/shared/app-authentication/data-access';

@Component({
  selector: 'hk-sign-up-container',
  templateUrl: './sign-up-container.component.html',
  styleUrls: ['./sign-up-container.component.scss'],
})
export class SignUpContainerComponent implements OnInit {
  constructor(private authFacade: AppAuthenticateFacade) {}

  ngOnInit(): void {}

  onSubmit(user: User) {
    this.authFacade.signup(user);
  }
}
