import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DxTreeViewComponent } from 'devextreme-angular/ui/tree-view';
import { navItem } from '../../options/nav-item';
import { filter, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'hk-side-navigation-menu',
  templateUrl: './side-navigation-menu.component.html',
  styleUrls: ['./side-navigation-menu.component.scss'],
})
export class SideNavigationMenuComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DxTreeViewComponent, { static: true })
  menu: DxTreeViewComponent;

  alive = true;
  selectedItem: string;

  @Output()
  itemClicked = new EventEmitter<string>();

  @Input()
  isMenuOpen: boolean;

  @Input() menuItems: navItem[];

  @Input()
  set isMenuClosing(val: boolean) {
    if (this.menu.instance && val) {
      this.menu.instance.collapseAll();
    } else if (this.menu.instance && !val) {
      this.menu.instance.expandItem(this.selectedItem);
    }
  }

  constructor(private router: Router) {
    router.events
      .pipe(
        takeWhile(() => this.alive),
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe((navEvent: NavigationEnd) => {
        if (navEvent.url != this.selectedItem) {
          this.menu.instance.unselectAll();
        }
      });
  }

  onItemClick(item: any) {
    this.selectedItem = item.itemData.path;
    this.itemClicked.emit(this.selectedItem);
    if (this.isMenuOpen) {
      if (this.selectedItem) {
        this.menu.instance.selectItem(this.selectedItem);
        this.router.navigate([this.selectedItem]);
      }
    }
  }

  ngOnInit() {
    this.selectedItem = location.pathname;
  }

  ngOnDestroy() {
    this.alive = false;
  }

  ngAfterViewInit() {
    this.menu.instance.selectItem(this.selectedItem);
  }
}
