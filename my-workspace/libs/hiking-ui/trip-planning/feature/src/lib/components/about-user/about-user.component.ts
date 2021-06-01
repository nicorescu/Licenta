import { Component, OnInit, Input } from '@angular/core';
import { User } from '@hkworkspace/shared/app-authentication/data-access';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'hk-about-user',
  templateUrl: './about-user.component.html',
  styleUrls: ['./about-user.component.scss'],
})
export class AboutUserComponent implements OnInit {
  @Input()
  user: User;
  activeLang: string;
  constructor(private translocoService: TranslocoService) {}

  ngOnInit(): void {
    this.activeLang = this.translocoService.getActiveLang();
  }
}
