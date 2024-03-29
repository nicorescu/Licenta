import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router'
import {MatDividerModule} from '@angular/material/divider';

import { TranslocoModule } from '@ngneat/transloco';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

import { SignUpContainerComponent } from './containers/sign-up-container/sign-up-container.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignInContainerComponent } from './containers/sign-in-container/sign-in-container.component';
import {JwtModule} from '@auth0/angular-jwt';
import {DatePipe} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    TranslocoModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatDatepickerModule,
    NgxIntlTelInputModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    MatDividerModule,
    JwtModule,
    MatProgressSpinnerModule,
    MatSelectCountryModule.forRoot('en')
  ],
  declarations: [SignUpComponent, SignUpContainerComponent, SignInComponent, SignInContainerComponent],
  providers: [DatePipe]
})
export class SharedAppAuthenticationFeatureModule {}
