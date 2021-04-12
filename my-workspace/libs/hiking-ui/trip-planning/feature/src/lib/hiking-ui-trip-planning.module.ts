import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';

import { TripPlanningComponent } from './container/trip-planning/trip-planning.component';
import { SearchTripComponent } from './components/search-trip/search-trip.component';

import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

import { HikingUiUiCommonUiModule } from '@hkworkspace/hiking-ui/ui-common/ui';
import { HikingUiTripPlanningDataAccessModule } from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { ConversationsComponent } from './components/conversations/conversations.component';
import { CreateTripComponent } from './components/create-trip/create-trip.component';

@NgModule({
  imports: [
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
  ],
  declarations: [
    TripPlanningComponent,
    SearchTripComponent,
    NotificationsComponent,
    MyAccountComponent,
    ConversationsComponent,
    CreateTripComponent,
  ],
})
export class HikingUiTripPlanningFeatureModule {}
