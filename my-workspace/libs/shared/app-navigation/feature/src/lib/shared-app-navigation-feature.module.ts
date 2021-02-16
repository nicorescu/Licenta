import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavigationMenuComponent } from './components/side-navigation-menu/side-navigation-menu.component';
import { SideNavigationInnerToolbarComponent } from './containers/side-navigation-inner-toolbar/side-navigation-inner-toolbar.component';
import { DxDrawerModule } from 'devextreme-angular/ui/drawer';
import { DxScrollViewModule} from 'devextreme-angular/ui/scroll-view';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxTreeViewModule} from 'devextreme-angular/ui/tree-view';
import { DxListModule } from 'devextreme-angular/ui/list';
import { DxContextMenuModule } from 'devextreme-angular/ui/context-menu';
import { ScreenService } from './options/screen.service';

@NgModule({
  imports: [
    CommonModule,
    DxTreeViewModule,
    DxDrawerModule,
    DxScrollViewModule,
    DxButtonModule,
    DxToolbarModule,
    DxListModule,
    DxLoadIndicatorModule,
    DxContextMenuModule
  ],
  providers: [
    ScreenService
  ],
  declarations: [
    SideNavigationMenuComponent,
    SideNavigationInnerToolbarComponent
  ],
  exports: [SideNavigationInnerToolbarComponent]
})
export class SharedAppNavigationFeatureModule {}
