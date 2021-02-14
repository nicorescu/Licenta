import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxScrollViewComponent } from 'devextreme-angular';
import { navItem } from '../../options/nav-item';
import { ScreenService } from '../../options/screen.service';

@Component({
  selector: 'hk-side-navigation-inner-toolbar',
  templateUrl: './side-navigation-inner-toolbar.component.html',
  styleUrls: ['./side-navigation-inner-toolbar.component.scss']
})
export class SideNavigationInnerToolbarComponent implements OnInit {

  @ViewChild(DxScrollViewComponent) scrollView: DxScrollViewComponent | undefined;
  selectedRoute = 's';

  menuOpened: boolean = false;
  temporaryMenuOpened = false;

  @Input()
  title: string = '';

  @Input()
  menuItems: navItem[];

  menuMode = 'shrink';
  menuRevealMode = 'expand';
  minMenuSize = 1;
  shaderEnabled = false;

  constructor(private screen: ScreenService, private router: Router) {}

  ngOnInit() {
    this.menuOpened = this.screen.sizes['screen-large'];

    // this.router.events.subscribe(val => {
    //   if (val instanceof NavigationEnd) {
    //     this.selectedRoute = val.urlAfterRedirects.split('?')[0]; 
    //   }
    // });

    this.screen.changed.subscribe(() => this.updateDrawer());

    this.updateDrawer();
  }

  updateDrawer() {
    const isXSmall = this.screen.sizes['screen-x-small'];
    const isLarge = this.screen.sizes['screen-large'];

    this.menuMode = isLarge ? 'shrink' : 'overlap';
    this.menuRevealMode = isXSmall ? 'slide' : 'expand';
    this.minMenuSize = isXSmall ? 0 : 60;
    this.shaderEnabled = !isLarge;
  }

  toggleMenu = (e : any) => {
    this.menuOpened = !this.menuOpened;
    e.event.stopPropagation();
  }

  get hideMenuAfterNavigation() {
    return this.menuMode === 'overlap' || this.temporaryMenuOpened;
  }

  get showMenuAfterClick() {
    return !this.menuOpened;
  }

  navigationChanged(event : any) {
    const path = event.itemData.path;
    const pointerEvent = event.event;
    this.selectedRoute=path;
    console.log("route:",this.selectedRoute)
    if (path && this.menuOpened) {
      if (event.node.selected) {
        pointerEvent.preventDefault();
      } else {
        this.router.navigate([path]);
        this.scrollView?.instance.scrollTo(0);
      }

      if (this.hideMenuAfterNavigation) {
        this.temporaryMenuOpened = false;
        this.menuOpened = false;
        pointerEvent.stopPropagation();
      }
    } else {
      pointerEvent.preventDefault();
    }
  }

  navigationClick() {
    if (this.showMenuAfterClick) {
      this.temporaryMenuOpened = true;
      this.menuOpened = true;
    }
  }

}
