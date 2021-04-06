import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { AppAuthenticateEffects } from './app-authenticate.effects';
import * as AppAuthenticateActions from './app-authenticate.actions';

describe('AppAuthenticateEffects', () => {
  let actions: Observable<any>;
  let effects: AppAuthenticateEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        AppAuthenticateEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(AppAuthenticateEffects);
  });

  describe('init$', () => {});
});
