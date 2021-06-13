import {
  Component,
  OnInit,
  Input,
  ViewChild,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Trip } from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'hk-account-trips-paginator',
  templateUrl: './account-trips-paginator.component.html',
  styleUrls: ['./account-trips-paginator.component.scss'],
})
export class AccountTripsPaginatorComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @Input()
  count: number;
  @Output()
  pageChanged = new EventEmitter();

  alive = true;
  constructor() {}

  ngOnInit(): void {
    this.paginator.page.pipe(takeWhile(() => this.alive)).subscribe((page) => {
      this.pageChanged.emit(page.pageIndex + 1);
    });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
