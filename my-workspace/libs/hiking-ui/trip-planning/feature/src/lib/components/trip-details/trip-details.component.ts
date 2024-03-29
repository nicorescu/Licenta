import { Component, Input, OnInit } from '@angular/core';
import {
  PlanningFacade,
  Trip,
  TripPrivacy,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { TranslocoService } from '@ngneat/transloco';
import { take } from 'rxjs/operators';

@Component({
  selector: 'hk-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss'],
})
export class TripDetailsComponent implements OnInit {
  @Input()
  trip: Trip;
  @Input()
  slotsText: string;
  tripPrivacy = TripPrivacy;
  activeLang: string;
  constructor(private translocoService: TranslocoService) {}

  ngOnInit(): void {
    this.activeLang = this.translocoService.getActiveLang();
  }

  public get numberOfDays() {
    return (
      (this.trip?.endDate.getTime() - this.trip?.startDate.getTime()) /
        (1000 * 3600 * 24) +
      1
    );
  }

  public get slots() {
    return this.trip?.slotsNumber - this.trip?.participantsIds.length;
  }
}
