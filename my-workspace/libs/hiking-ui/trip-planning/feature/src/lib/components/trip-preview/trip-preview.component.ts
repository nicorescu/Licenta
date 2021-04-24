import { Component, OnInit } from '@angular/core';
import {
  GooglePlacesService,
  PlanningFacade,
  Trip,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { take } from 'rxjs/operators';

@Component({
  selector: 'hk-trip-preview',
  templateUrl: './trip-preview.component.html',
  styleUrls: ['./trip-preview.component.scss'],
})
export class TripPreviewComponent implements OnInit {
  constructor(
    private planningFacade: PlanningFacade,
    private googleService: GooglePlacesService
  ) {}

  planningTrip: Trip;
  photoUrls: string[];
  mainPhotoUrl: string;

  ngOnInit(): void {
    this.planningFacade.planningTrip$.pipe(take(1)).subscribe(
      (trip) => {
        this.planningTrip = trip;
      },
      () => {},
      () => {
        if (this.planningTrip) {
          this.googleService
            .getDetailsByQuery(
              this.planningTrip.locationName,
              'tourist_attraction'
            )
            .pipe(take(1))
            .subscribe((data: any) => {
              console.log('data:', data);
              console.log(data.results.sort(this.sortByReviewComparator)[0]);
              const sortedData = data.results.sort(this.sortByReviewComparator);

              this.mainPhotoUrl = this.googleService.getPhotoUrl(
                sortedData.find((x) => x['photos'] !== undefined).photos[0]
                  .photo_reference,
                500
              );
            });
        }
      }
    );
  }

  sortByReviewComparator(a, b): number {
    if (a.rating < b.rating) {
      return 1;
    } else if (a.rating > b.rating) {
      return -1;
    } else if (a.user_ratings_total < b.user_ratings_total) {
      return 1;
    }
    return 0;
  }
}
