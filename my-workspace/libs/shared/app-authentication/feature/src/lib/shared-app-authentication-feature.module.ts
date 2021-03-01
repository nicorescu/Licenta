import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TranslocoModule } from '@ngneat/transloco';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { SignUpContainerComponent } from './container/sign-up-container/sign-up-container.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    TranslocoModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule
  ],
  declarations: [SignUpComponent, SignUpContainerComponent],
})
export class SharedAppAuthenticationFeatureModule {}
