import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

import { AppAuthenticateFacade } from '@hkworkspace/shared/app-authentication/data-access';
import { AccountProvider } from 'libs/shared/app-authentication/data-access/src/lib/models/account-provider.model';
import { Credentials } from 'libs/shared/app-authentication/data-access/src/lib/models/credentials.model';
import { SessionToken } from 'libs/shared/app-authentication/data-access/src/lib/models/session-token.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'hk-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  @Output() signInSubmitted = new EventEmitter();

  error$: Observable<string>;
  isLoading$: Observable<boolean>;
  credentials: Credentials;

  constructor(
    private formBuilder: FormBuilder,
    private authFacade: AppAuthenticateFacade
  ) {
  }
  

  ngOnInit(): void {
    this.error$ = this.authFacade.error$;
    this.isLoading$ = this.authFacade.isLoading$;

    this.signInForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-zA-Z]{2,3}'),
          Validators.required,
        ],
      ],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if(this.signInForm.invalid){
      return;
    }
    this.credentials = {...this.signInForm.getRawValue(), provider:AccountProvider.TripPlanning};
    this.signInSubmitted.emit(this.credentials)
  }

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }
}
