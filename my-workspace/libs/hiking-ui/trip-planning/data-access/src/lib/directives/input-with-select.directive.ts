import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[input-with-select]',
})
export class InputWithSelectDirective {
  constructor(private el: ElementRef) {}
}
