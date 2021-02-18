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
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { DxTreeViewComponent } from 'devextreme-angular/ui/tree-view';
import { filter } from 'rxjs/operators';
import { navItem } from '../../options/nav-item';

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

  constructor(
    private router: Router,
    private translocoService: TranslocoService
  ) {}

  onItemClick(item: any) {
    this.selectedItem = item.itemData.path;
    this.itemClicked.emit(this.selectedItem);
    if (this.isMenuOpen) {
      this.menu.instance.selectItem(this.selectedItem);
      if (this.selectedItem) {
        this.router.navigate([this.selectedItem]);
      }
    }
  }

  ngOnInit() {
    this.translocoService.load('en').subscribe();
    this.translocoService.events$.pipe(filter(event => event.type === 'translationLoadSuccess')).subscribe(() => {
      console.log(this.translocoService.translate('navigation.home'));
    })
    this.selectedItem = location.pathname;
    
  }

  ngOnDestroy() {
    this.alive = false;
  }

  ngAfterViewInit() {
    this.menu.instance.selectItem(this.selectedItem);
  }
}
