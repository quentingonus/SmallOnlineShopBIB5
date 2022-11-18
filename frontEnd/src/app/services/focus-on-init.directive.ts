import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[FocusOnInit]',
})
export class FocusOnInitDirective {
  constructor(public el: ElementRef) {}

  ngAfterContentInit() {
    this.el.nativeElement.focus();
  }
}
