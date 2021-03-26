import { AfterViewInit, Component, OnInit, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { User } from '../../models/user.model';

import {
  SearchCountryField,
  TooltipLabel,
  CountryISO,
  PhoneNumberFormat,
  NgxIntlTelInputComponent,
} from 'ngx-intl-tel-input';
import { Country, MatSelectCountryComponent } from '@angular-material-extensions/select-country';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'hk-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, AfterViewInit {
  @ViewChild('countrySelect') countrySelect;
  @ViewChild('phoneInput')
  phoneInput: NgxIntlTelInputComponent;

  user: User;
  repeatPassword: string;
  isInvalidCountry = true;
  signupForm: FormGroup;
  isSubmittedOnce = false;
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
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private translocoService: TranslocoService
  ) {
    this.user = new User();

    
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      repeatPassword: new FormControl('', [
        Validators.required,
        Validators.required,
      ]),
      phoneNumber: new FormControl(this.user.phoneNumber),
      birthday: new FormControl(this.user.birthday),
      country: new FormControl(''),
    });
  }

  ngAfterViewInit(){
    this.phoneInput.searchCountryPlaceholder = this.translocoService.translate('authentication.signUp.searchCountry');
  }

  onCountrySelected(country: Country) {
    this.user.country = country.name;
    this.isInvalidCountry = false;
  }

  keydown() {
    this.isInvalidCountry = true;
  }

  onSubmit(){
    this.isSubmittedOnce = true;
  }
}
