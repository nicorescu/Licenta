import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxScrollViewComponent } from 'devextreme-angular';
import { navItem } from '../../options/nav-item';
import { ScreenService } from '../../options/screen.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'hk-side-navigation-inner-toolbar',
  templateUrl: './side-navigation-inner-toolbar.component.html',
  styleUrls: ['./side-navigation-inner-toolbar.component.scss'],
})
export class SideNavigationInnerToolbarComponent implements OnInit, OnDestroy {
  @ViewChild(DxScrollViewComponent) scrollView: DxScrollViewComponent;

  alive = true;
  menuOpened = false;
  temporaryMenuOpened = false;
  minMenuSize = 60;

  @Input()
  title: string;

  @Input()
  menuItems: navItem[];

  menuMode = 'shrink';
  menuRevealMode = 'expand';
  shaderEnabled = false;

  constructor(private screen: ScreenService) {}

  ngOnInit() {
    this.updateDrawer();

    this.screen.changed.pipe(takeWhile(() => this.alive)).subscribe(() => {
      this.updateDrawer();
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  updateDrawer() {
    const isXSmall = this.screen.sizes['screen-x-small'];
    const isLarge = this.screen.sizes['screen-large'];

    this.menuMode = isLarge ? 'shrink' : 'overlap';
    this.menuRevealMode = isXSmall ? 'slide' : 'expand';
    this.shaderEnabled = !isLarge;
  }

  toggleMenu = () => {
    this.menuOpened = !this.menuOpened;
  };

  itemClicked(path: string) {
    if (!this.menuOpened) {
      this.temporaryMenuOpened = true;
      this.menuOpened = true;
    } else if (this.temporaryMenuOpened && path) {
      this.temporaryMenuOpened = false;
      this.menuOpened = false;
    }
  }
}
