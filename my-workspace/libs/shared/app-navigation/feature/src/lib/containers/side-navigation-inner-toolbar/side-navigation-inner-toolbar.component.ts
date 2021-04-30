import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DxScrollViewComponent } from 'devextreme-angular';
import { navItem } from '../../options/nav-item';
import { ScreenService } from '../../options/screen.service';
import { filter, takeWhile } from 'rxjs/operators';
import { TranslocoService } from '@ngneat/transloco';

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

  footerLeftText: string;
  footerRightText: string;
  showFooter: boolean;

  constructor(
    private screen: ScreenService,
    private router: Router,
    private translocoService: TranslocoService
  ) {}

  ngOnInit() {
    this.updateDrawer();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url.indexOf('preview-trip') !== -1) {
          this.showFooter = true;
        } else {
          this.showFooter = false;
        }
      });
    this.footerLeftText = this.translocoService.translate(
      'tripPlanning.tripPreview.edit'
    );
    this.footerRightText = this.translocoService.translate(
      'tripPlanning.tripPreview.finalize'
    );

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
