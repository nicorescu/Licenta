import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'hk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  authenticated: boolean;
  
  user: {email: 'Nicorescu@gmail.com'};

  constructor(private router: Router) { }

  ngOnInit() {
  }

  SignUp() {
    this.router.navigate(['/signup']);
  }

}
