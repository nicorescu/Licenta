import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxTreeViewComponent } from 'devextreme-angular/ui/tree-view';
import { navItem } from '../../options/nav-item';

@Component({
  selector: 'hk-side-navigation-menu',
  templateUrl: './side-navigation-menu.component.html',
  styleUrls: ['./side-navigation-menu.component.scss'],
})
export class SideNavigationMenuComponent implements OnInit, AfterViewInit {
  @ViewChild(DxTreeViewComponent, { static: true })
  menu: DxTreeViewComponent;

  @Output()
  selectedItemChanged = new EventEmitter<string>();

  @Output()
  openMenu = new EventEmitter<any>();

  @Input() menuItems: navItem[];

  @Input()
  selectedItem: String = '';

  @Input()
  isCompactMode = true;

  @Input()
  get compactMode() {
    return this.isCompactMode;
  }
  set compactMode(val) {
    this.isCompactMode = val;

    if (!this.menu?.instance) {
      return;
    }

    if (val) {
      this.menu.instance.collapseAll();
    } else {
      this.menu.instance.expandItem(this.selectedItem);
    }
  }

  constructor(
    private router: Router
  ) {}

  onItemClick(item: any) {
    this.menu.instance.selectItem(item.itemData.path);
    if (item.itemData.path) {
      this.router.navigate([item.itemData.path]);
    }
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.menu.instance.selectItem(location.pathname);
  }
}
