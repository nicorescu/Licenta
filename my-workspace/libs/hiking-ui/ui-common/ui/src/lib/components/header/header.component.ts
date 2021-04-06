import { Component, OnInit } from '@angular/core';
import {
  AppAuthenticateFacade,
  SessionToken,
} from '@hkworkspace/shared/app-authentication/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'hk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  sessionToken$: Observable<SessionToken>;
  constructor(private authFacade: AppAuthenticateFacade) {}

  ngOnInit() {
    this.sessionToken$ = this.authFacade.sessionToken$;
  }

  logoutClicked() {
    this.authFacade.logout();
  }
}
