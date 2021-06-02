import { Country } from '@angular-material-extensions/select-country';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  EditableField,
  UserService,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import {
  PhoneNumber,
  User,
} from '@hkworkspace/shared/app-authentication/data-access';
import { ToastService } from '@hkworkspace/utils';
import { TranslocoService } from '@ngneat/transloco';
import { concatMap, switchMap, take, takeWhile } from 'rxjs/operators';
import { EditFieldComponent } from '../edit-field/edit-field.component';

interface userEditableData {
  firstName: string;
  lastName: string;
  email: string;
  phone: PhoneNumber;
  birthdate: Date;
  country: Country;
  editingField: EditableField;
}

@Component({
  selector: 'hk-edit-information',
  templateUrl: './edit-information.component.html',
  styleUrls: ['./edit-information.component.scss'],
})
export class EditInformationComponent implements OnInit, OnDestroy {
  @Input()
  user: User;
  @Input()
  activeLang: string;
  editableField = EditableField;
  alive = true;
  obj: userEditableData;

  @Output()
  userUpdated = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private toastrService: ToastService,
    private translocoService: TranslocoService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.alive = false;
  }

  openEditFieldDialog(editableField: EditableField) {
    const dialogRef = this.dialog.open(EditFieldComponent, {
      minWidth: '400px',
      maxHeight: '95vh',
      maxWidth: '90vw',
      minHeight: editableField === EditableField.Phone ? '370px' : '',
      data: {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        phone: this.user.phoneNumber,
        birthdate: this.user.birthday,
        country: this.user.country,
        activeLang: this.activeLang,
        editingField: editableField,
      },
    });

    dialogRef.componentInstance.saveClicked
      .pipe(
        take(1),
        switchMap((obj: userEditableData) => {
          this.obj = obj;
          console.log('obj: ', this.obj);
          return this.userService.getUserById(this.user.id);
        }),
        concatMap((user) => {
          switch (this.obj.editingField) {
            case EditableField.Name:
              user = {
                ...user,
                firstName: this.obj.firstName,
                lastName: this.obj.lastName,
              };
              break;
            case EditableField.Email:
              user = { ...user, email: this.obj.email };
              break;
            case EditableField.Country:
              user = {
                ...user,
                country: this.obj.country.name,
                countryCode: this.obj.country.alpha2Code,
              };
              break;
            case EditableField.Phone:
              user = { ...user, phoneNumber: this.obj.phone };
              break;
            case EditableField.Birthdate:
              user = { ...user, birthday: this.obj.birthdate };
              break;
            default:
              break;
          }
          return this.userService.updateUser(user);
        })
      )
      .subscribe(() => {
        this.userUpdated.emit();
      });
  }
}
