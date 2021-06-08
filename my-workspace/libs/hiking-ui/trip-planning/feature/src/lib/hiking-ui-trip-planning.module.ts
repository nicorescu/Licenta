import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  MatSelectCountryLangToken,
  MatSelectCountryModule,
} from '@angular-material-extensions/select-country';

import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';

import { TripPlanningComponent } from './container/trip-planning/trip-planning.component';
import { SearchTripComponent } from './components/search-trip/search-trip.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ConversationsComponent } from './components/conversations/conversations.component';
import { CreateTripComponent } from './components/create-trip/create-trip.component';
import { TripPreviewComponent } from './container/trip-preview/trip-preview.component';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { PhotosComponent } from './components/photos/photos.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { TripPlacesComponent } from './components/trip-attractions/trip-attractions.component';
import { AttractionComponent } from './components/attraction/attraction.component';
import { CreateAndPreviewTripComponent } from './container/create-and-preview-trip/create-and-preview-trip.component';
import { PhotoComponent } from './components/photo/photo.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { TripsListComponent } from './container/trips-list/trips-list.component';
import { TripCardComponent } from './components/trip-card/trip-card.component';
import { TripsPaginatorComponent } from './components/trips-paginator/trips-paginator.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ViewSelectedTripComponent } from './container/view-selected-trip/view-selected-trip.component';
import { LoadingComponent } from './components/loading/loading.component';
import { FriendOptionsComponent } from './components/friend-options/friend-options.component';
import { TripActionsComponent } from './components/trip-actions/trip-actions.component';
import { MyAccountComponent } from './container/my-account/my-account.component';
import { ImageActionsComponent } from './components/image-actions/image-actions.component';
import { ImageCropperComponent } from './components/image-cropper/image-cropper.component';
import { AboutUserComponent } from './components/about-user/about-user.component';
import { FriendsComponent } from './components/friends/friends.component';
import { UserTripsComponent } from './components/user-trips/user-trips.component';
import { AccountTripsPaginatorComponent } from './components/account-trips-paginator/account-trips-paginator.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditFieldComponent } from './components/edit-field/edit-field.component';

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
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

import 'hammerjs';
import 'mousetrap';
import { EditInformationComponent } from './components/edit-information/edit-information.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PublicProfileComponent } from './container/public-profile/public-profile.component';
import { ChatComponent } from './container/chat/chat.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    MatListModule,
    MatMenuModule,
    ImageCropperModule,
    MatDialogModule,
    NgxIntlTelInputModule,
    MatExpansionModule,
    DxScrollViewModule,
    MatSelectCountryModule.forRoot('en'),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBPgVrWygCqhFiOdZL3a0ECSPJ7moDHn4Q',
      libraries: ['places'],
    }),
  ],
  declarations: [
    TripPlanningComponent,
    SearchTripComponent,
    NotificationsComponent,
    ConversationsComponent,
    CreateTripComponent,
    CreateAndPreviewTripComponent,
    TripPreviewComponent,
    GoogleMapComponent,
    PhotosComponent,
    TripDetailsComponent,
    TripPlacesComponent,
    AttractionComponent,
    PhotoComponent,
    StarRatingComponent,
    TripsListComponent,
    TripCardComponent,
    TripsPaginatorComponent,
    FiltersComponent,
    ViewSelectedTripComponent,
    LoadingComponent,
    FriendOptionsComponent,
    TripActionsComponent,
    MyAccountComponent,
    ImageActionsComponent,
    ImageCropperComponent,
    AboutUserComponent,
    FriendsComponent,
    UserTripsComponent,
    AccountTripsPaginatorComponent,
    EditProfileComponent,
    EditFieldComponent,
    EditInformationComponent,
    ProfileComponent,
    PublicProfileComponent,
    ChatComponent,
  ],
  providers: [NgxImageCompressService],
})
export class HikingUiTripPlanningFeatureModule {}
