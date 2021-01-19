import { Directive, EventEmitter, ElementRef, HostListener, Output, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {

  constructor(private elementRef: ElementRef) {}

  @Output()
  clickOutside: EventEmitter<any> = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  onMouseClick(targetElement: any): void {
    console.log('Dyrektywa');
    if (!this.elementRef.nativeElement.contains(targetElement)) {
      this.clickOutside.emit(null);
    }
  }

}
