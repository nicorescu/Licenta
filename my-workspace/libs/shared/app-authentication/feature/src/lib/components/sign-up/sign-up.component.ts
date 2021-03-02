import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import { SearchCountryField, TooltipLabel, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

@Component({
  selector: 'hk-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  user: User;
  repeatPassword: string;

	searchCountryField = SearchCountryField;
	tooltipLabel = TooltipLabel;
	countryISO = CountryISO;
  phoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.Romania, CountryISO.UnitedStates, CountryISO.UnitedKingdom];

  constructor() { 
    this.user = new User();
  }

  ngOnInit(): void {
  }
  
}
