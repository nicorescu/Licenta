import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';

import { TripPlanningComponent } from './container/trip-planning/trip-planning.component';
import { SearchTripComponent } from './components/search-trip/search-trip.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { ConversationsComponent } from './components/conversations/conversations.component';
import { CreateTripComponent } from './components/create-trip/create-trip.component';
import { TripPreviewComponent } from './container/trip-preview/trip-preview.component';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { PhotosComponent } from './components/photos/photos.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { TripAttractionsComponent } from './components/trip-attractions/trip-attractions.component';
import { AttractionComponent } from './components/attraction/attraction.component';
import { CreateAndPreviewTripComponent } from './container/create-and-preview-trip/create-and-preview-trip.component';
import { PhotoComponent } from './components/photo/photo.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { TripsListComponent } from './container/trips-list/trips-list.component';
import { TripCardComponent } from './components/trip-card/trip-card.component';
import { TripsPaginatorComponent } from './components/trips-paginator/trips-paginator.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ViewSelectedTripComponent } from './container/view-selected-trip/view-selected-trip.component';

import { HikingUiUiCommonUiModule } from '@hkworkspace/hiking-ui/ui-common/ui';
import { HikingUiTripPlanningDataAccessModule } from '@hkworkspace/hiking-ui/trip-planning/data-access';

import { AgmCoreModule } from '@agm/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { NgxImageGalleryModule } from 'ngx-image-gallery';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RatingModule } from 'ng-starrating';
import 'hammerjs';
import 'mousetrap';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    TranslocoModule,
    HttpClientModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    FormsModule,
    HikingUiUiCommonUiModule,
    HikingUiTripPlanningDataAccessModule,
    MatDividerModule,
    RouterModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    Ng2ImgMaxModule,
    NgxImageGalleryModule,
    GalleryModule,
    RxReactiveFormsModule,
    RatingModule,
    FontAwesomeModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatStepperModule,
    MatTabsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBPgVrWygCqhFiOdZL3a0ECSPJ7moDHn4Q',
      libraries: ['places'],
    }),
  ],
  declarations: [
    TripPlanningComponent,
    SearchTripComponent,
    NotificationsComponent,
    MyAccountComponent,
    ConversationsComponent,
    CreateTripComponent,
    CreateAndPreviewTripComponent,
    TripPreviewComponent,
    GoogleMapComponent,
    PhotosComponent,
    TripDetailsComponent,
    TripAttractionsComponent,
    AttractionComponent,
    PhotoComponent,
    StarRatingComponent,
    TripsListComponent,
    TripCardComponent,
    TripsPaginatorComponent,
    FiltersComponent,
    ViewSelectedTripComponent,
  ],
  providers: [NgxImageCompressService],
})
export class HikingUiTripPlanningFeatureModule {}
