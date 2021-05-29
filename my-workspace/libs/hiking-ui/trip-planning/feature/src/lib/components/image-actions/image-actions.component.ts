import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { AppAuthenticateFacade } from '@hkworkspace/shared/app-authentication/data-access';
import { take } from 'rxjs/operators';
import { ImageCropperComponent } from '../image-cropper/image-cropper.component';
@Component({
  selector: 'hk-image-actions',
  templateUrl: './image-actions.component.html',
  styleUrls: ['./image-actions.component.scss'],
})
export class ImageActionsComponent implements OnInit {
  @Input()
  imageUrl: string;

  constructor(
    private userService: UserService,
    private authFacade: AppAuthenticateFacade,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {}

  imagePicked(event) {
    const image: File = event.target.files[0];
    this.openDialog(event);
    // this.authFacade.sessionToken$
    //   .pipe(
    //     switchMap((token) => {
    //       return this.userService.addProfilePicture(token.loggedInId, image);
    //     }),
    //     catchError((err) => {
    //       console.log(err);
    //       return of();
    //     })
    //   )
    //   .subscribe();
  }

  openDialog(event) {
    const dialogRef = this.dialog.open(ImageCropperComponent, {
      width: 'auto',
      height: 'auto',
      data: { imageChangedEvent: event },
      disableClose: true,
      maxWidth: '',
    });
  }
}
