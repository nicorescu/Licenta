import { Component, HostBinding } from '@angular/core';
import { AuthService, ScreenService, AppInfoService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {

  constructor(private authService: AuthService, private screen: ScreenService, public appInfo: AppInfoService) { }
  menuItems = [
    {
      text: 'Home',
      path: '/home',
      icon: 'home'
    },
    {
      text: 'Examples',
      icon: 'folder',
      items: [
        {
          text: 'Profile',
          path: '/profile'
        },
        {
          text: 'Tasks',
          path: '/tasks'
        }
      ]
    }
  ]
  isAuthenticated() {
    return this.authService.loggedIn;
  }
}
