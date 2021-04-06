import { Component, OnInit } from '@angular/core';
import { AppAuthenticateFacade } from '@hkworkspace/shared/app-authentication/data-access';
import { Credentials } from 'libs/shared/app-authentication/data-access/src/lib/models/credentials.model';

@Component({
  selector: 'hk-sign-in-container',
  templateUrl: './sign-in-container.component.html',
  styleUrls: ['./sign-in-container.component.scss']
})
export class SignInContainerComponent implements OnInit {

  constructor(private authFacade: AppAuthenticateFacade) { }

  ngOnInit(): void {
  }

  onSubmit(credentials: Credentials){
    this.authFacade.authenticate(credentials);
  }
}
