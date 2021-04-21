import { Injectable } from '@angular/core';
import notify from 'devextreme/ui/notify';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  messageOptions = {
    message: '',
    type: '',
    displayTime: 2000,
  };
  constructor() {}

  info(msg: string) {
    this.messageOptions.message = msg;
    this.messageOptions.type = 'info';
    notify(this.messageOptions);
  }

  error(msg: string) {
    this.messageOptions.message = msg;
    this.messageOptions.type = 'error';
    notify(this.messageOptions);
  }

  success(msg: string) {
    this.messageOptions.message = msg;
    this.messageOptions.type = 'success';
    notify(this.messageOptions);
  }

  warning(msg: string) {
    this.messageOptions.message = msg;
    this.messageOptions.type = 'warning';
    notify(this.messageOptions);
  }

  custom(msg: string) {
    this.messageOptions.message = msg;
    this.messageOptions.type = 'custom';
    notify(this.messageOptions);
  }
}
