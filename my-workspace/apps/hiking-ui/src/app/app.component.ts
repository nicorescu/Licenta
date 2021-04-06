import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { navItem } from 'libs/shared/app-navigation/feature/src/lib/options/nav-item';
import { filter, take } from 'rxjs/operators';
import {
  AppAuthenticateFacade,
  AuthService,
} from '@hkworkspace/shared/app-authentication/data-access';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  menuItems: navItem[];

  constructor(
    private translocoService: TranslocoService,
    private authFacade: AppAuthenticateFacade,
    private authService: AuthService
  ) {
    this.authFacade.setSessionToken(this.authService.getSessionToken());
    const activeLang = translocoService.getActiveLang();
    this.translocoService.load(activeLang).pipe(take(1)).subscribe();
    this.translocoService.events$
      .pipe(
        filter((event) => event.type === 'translationLoadSuccess'),
        take(1)
      )
      .subscribe(() => {
        this.menuItems = [
          {
            text: this.translocoService.translate('navigation.home'),
            path: '/trip-planning',
            icon: 'home',
          },
          {
            text: 'Examples',
            icon: 'folder',
            items: [
              {
                text: this.translocoService.translate('navigation.profile'),
                path: '/profile',
              },
              {
                text: 'Tasks',
                path: '/tasks',
              },
            ],
          },
        ];
      });
  }
  title = 'Hiking';
}
