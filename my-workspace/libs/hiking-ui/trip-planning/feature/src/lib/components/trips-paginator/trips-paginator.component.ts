import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { TripFilter } from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'hk-trips-paginator',
  templateUrl: './trips-paginator.component.html',
  styleUrls: ['./trips-paginator.component.scss'],
})
export class TripsPaginatorComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @Input()
  length: number;
  @Input()
  tripsFilter: TripFilter;
  alive = true;

  @Output()
  paginationChangedEmitter = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.paginator.page.pipe(takeWhile(() => this.alive)).subscribe(() => {
      this.tripsFilter.requestedPage = this.paginator.pageIndex + 1;
      this.tripsFilter.pageSize = this.paginator.pageSize;
      this.paginationChangedEmitter.emit(this.tripsFilter);
    });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
