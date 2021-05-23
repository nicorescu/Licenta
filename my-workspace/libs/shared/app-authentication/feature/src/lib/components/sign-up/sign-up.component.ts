import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AccountProvider,
  User,
} from '@hkworkspace/shared/app-authentication/data-access';

import {
  SearchCountryField,
  TooltipLabel,
  CountryISO,
  PhoneNumberFormat,
  NgxIntlTelInputComponent,
} from 'ngx-intl-tel-input';
import { Country } from '@angular-material-extensions/select-country';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { TranslocoService } from '@ngneat/transloco';
import { Role } from '@hkworkspace/shared/app-authentication/data-access';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AppAuthenticateFacade } from '@hkworkspace/shared/app-authentication/data-access';

@Component({
  selector: 'hk-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, AfterViewInit {
  @ViewChild('countrySelect') countrySelect;

  @Output() signUpSubmitted = new EventEmitter();
  error$: Observable<string>;
  isLoading$: Observable<boolean>;

  user: User = {
    id: undefined,
    firstName: '',
    lastName: '',
    email: '',
    accountProvider: AccountProvider.TripPlanning,
    password: '',
    phoneNumber: '',
    birthday: null,
    country: '',
    countryCode: '',
    role: Role.User,
    friends: [],
    reviews: [],
    conversations: [],
    age: 0,
    reviewAverage: 0,
    friendRequests: [],
  };
  isInvalidCountry = true;
  signupForm: FormGroup;
  rendererListener: () => void;

  // searchCountryField = SearchCountryField;
  // tooltipLabel = TooltipLabel;
  // countryISO = CountryISO;
  // phoneNumberFormat = PhoneNumberFormat;
  // preferredCountries: CountryISO[] = [
  //   CountryISO.Romania,
  //   CountryISO.UnitedStates,
  //   CountryISO.UnitedKingdom,
  // ];

  constructor(
    private formBuilder: FormBuilder,
    private authFacade: AppAuthenticateFacade
  ) {}

  ngOnInit(): void {
    this.authFacade.init();
    this.error$ = this.authFacade.error$;
    this.isLoading$ = this.authFacade.isLoading$;

    this.signupForm = this.formBuilder.group({
      firstName: [this.user.firstName, [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: [''],
      birthday: [this.user.birthday, [Validators.required]],
    });
  }

  ngAfterViewInit() {}

  onCountrySelected(country: Country) {
    this.user.country = country.name;
    this.isInvalidCountry = false;
  }

  keydown() {
    this.isInvalidCountry = true;
  }

  onSubmit() {
    if (this.password.value != this.repeatPassword.value) {
      this.markInvalidRepeatPassword();
      return;
    }
    if (this.signupForm.invalid) {
      return;
    }
    this.setUserProps();
    this.signUpSubmitted.emit(this.user);
  }

  setUserProps() {
    this.user = {
      ...this.user,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      password: this.password.value,
      birthday: this.birthday.value,
    };
  }

  markInvalidRepeatPassword() {
    this.signupForm.controls['repeatPassword'].setErrors({ invalid: true });
  }

  get firstName() {
    return this.signupForm.get('firstName');
  }

  get lastName() {
    return this.signupForm.get('lastName');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get repeatPassword() {
    return this.signupForm.get('repeatPassword');
  }

  get phoneNumber() {
    return this.signupForm.get('phoneNumber');
  }

  get birthday() {
    return this.signupForm.get('birthday');
  }
}
