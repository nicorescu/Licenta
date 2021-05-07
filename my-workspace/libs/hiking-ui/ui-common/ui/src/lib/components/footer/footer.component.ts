import { Component, Input, OnInit } from '@angular/core';
import { PlanningFacade } from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { take } from 'rxjs/operators';

@Component({
  selector: 'hk-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  //THIS NEEDS SOME REFACTOR, IT'S JUST AN IMPROVIZATION

  @Input()
  routerLink: string;
  @Input()
  leftText: string;
  @Input()
  rightText: string;

  constructor(private planningFacade: PlanningFacade) {}

  ngOnInit(): void {}

  createTrip() {
    this.planningFacade.planningTrip$.pipe(take(1)).subscribe((trip) => {
      this.planningFacade.createTrip(trip);
    });
  }
}
