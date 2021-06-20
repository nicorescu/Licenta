import {
  Country,
  MatSelectCountryComponent,
} from '@angular-material-extensions/select-country';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditableField } from '@hkworkspace/hiking-ui/trip-planning/data-access';
import {
  PhoneNumber,
  User,
} from '@hkworkspace/shared/app-authentication/data-access';
import { TranslocoService } from '@ngneat/transloco';
import {
  CountryISO,
  NgxIntlTelInputComponent,
  PhoneNumberFormat,
  SearchCountryField,
  TooltipLabel,
} from 'ngx-intl-tel-input';
import { Observable, of } from 'rxjs';

interface DialogData {
  firstName: string;
  lastName: string;
  email: string;
  phone: PhoneNumber;
  country: string;
  birthdate: string;
  activeLang: string;
  editingField: EditableField;
}

@Component({
  selector: 'hk-edit-field',
  templateUrl: './edit-field.component.html',
  styleUrls: ['./edit-field.component.scss'],
})
export class EditFieldComponent implements OnInit, AfterViewInit {
  @ViewChild('countrySelect', { static: false })
  countrySelect: MatSelectCountryComponent;
  @ViewChild('phoneInput', { static: false })
  phoneInput: NgxIntlTelInputComponent;
  today = new Date();
  selectedCountry: Country;
  editableField = EditableField;
  editForm: FormGroup;
  saveClicked = new EventEmitter();

  searchCountryField = SearchCountryField;
  tooltipLabel = TooltipLabel;
  countryISO = CountryISO;
  phoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.Romania,
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  phoneSelector: Element;
  rendererListener: () => void;
  isPhoneSelectorOpen: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private translocoService: TranslocoService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      firstName: [
        this.data.firstName,
        [
          Validators.required,
          Validators.pattern("([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"),
        ],
      ],
      lastName: [
        this.data.lastName,
        [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
      ],
      email: [
        this.data.email,
        [
          Validators.required,
          Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'),
        ],
      ],
      country: [this.data.country],
      phone: [this.data.phone],
      birthdate: [this.data.birthdate],
    });
  }

  ngAfterViewInit() {
    if (this.countrySelect) {
      this.countrySelect.placeHolder = this.translocoService.translate(
        'profile.editProfile.selectCountry'
      );
      this.countrySelect.inputChanged = (val) => {
        if (val != '') {
          this.country.setErrors({ invalid: true });
        } else {
          this.country.setErrors(null);
        }
      };
    }

    if (this.phoneInput) {
      this.phoneInput.searchCountryPlaceholder = this.translocoService.translate(
        'profile.editProfile.selectCountry'
      );

      this.phoneSelector = document.getElementById(
        'phoneInput'
      ).firstElementChild.firstElementChild;
    }

    this.changeDetectorRef.detectChanges();
  }

  onSubmit() {
    if (this.editForm.invalid) {
      return;
    }
    this.saveClicked.emit({
      ...this.editForm.getRawValue(),
      country: this.selectedCountry,
      editingField: this.data.editingField,
    });
  }

  onCountrySelected(country: Country) {
    this.country.setErrors(null);
    this.selectedCountry = country;
  }

  public get firstName() {
    return this.editForm.controls['firstName'];
  }

  public get lastName() {
    return this.editForm.controls['lastName'];
  }

  public get email() {
    return this.editForm.controls['email'];
  }

  public get country() {
    return this.editForm.controls['country'];
  }

  public get phone() {
    return this.editForm.controls['phone'];
  }

  public get birthdate() {
    return this.editForm.controls['birthdate'];
  }
}
