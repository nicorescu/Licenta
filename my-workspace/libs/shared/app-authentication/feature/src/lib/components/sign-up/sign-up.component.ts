import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { User } from '../../models/user.model';

import {
  SearchCountryField,
  TooltipLabel,
  CountryISO,
  PhoneNumberFormat,
  NgxIntlTelInputComponent,
} from 'ngx-intl-tel-input';
import { Country } from '@angular-material-extensions/select-country';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
  
  import { TranslocoService,getBrowserCultureLang } from '@ngneat/transloco';
import { RoleEnum } from '../../models/roleEnum.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'hk-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, AfterViewInit {
  @ViewChild('countrySelect') countrySelect;
  @ViewChild('phoneInput')
  phoneInput: NgxIntlTelInputComponent;

  @Output() signUpSubmitted = new EventEmitter();

  user: User = {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    birthday: null,
    country: '',
    role: null,
    friends: null,
  };
  isInvalidCountry = true;
  signupForm: FormGroup;
  rendererListener: () => void;

  searchCountryField = SearchCountryField;
  tooltipLabel = TooltipLabel;
  countryISO = CountryISO;
  phoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.Romania,
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];

  constructor(
    private formBuilder: FormBuilder,
    private translocoService: TranslocoService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
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
      phoneNumber: [this.user.phoneNumber],
      birthday: [this.user.birthday, [Validators.required]],
      country: [''],
    });

  }

  ngAfterViewInit() {
    this.phoneInput.searchCountryPlaceholder = this.translocoService.translate(
      'authentication.signUp.searchCountry'
    );
  }

  onCountrySelected(country: Country) {
    this.user.country = country.name;
    this.isInvalidCountry = false;
  }

  keydown() {
    this.isInvalidCountry = true;
  }

  onSubmit() {
    this.setUserProps();
    if (this.password.value != this.repeatPassword.value) {
      this.markInvalidRepeatPassword();
      return;
    }
    if (this.signupForm.invalid) {
      return;
    }

    this.signUpSubmitted.emit(this.user);
  }

  setUserProps() {
    this.user = {
      id: null,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      password: this.password.value,
      phoneNumber: null,
      birthday: this.datePipe.transform(this.birthday.value, 'dd-MM-yyyy') as unknown as Date,
      country: null,
      role: RoleEnum.User,
      friends: null,
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
