import { Directive, ElementRef } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Directive({
  selector: '[appHttpDisabled]'
})
export class HttpDisabledDirective {

  constructor(
    private element: ElementRef<HTMLButtonElement>,
    private globalService: GlobalService
  ) {
    this.globalService.getRunning().subscribe(
      (value: boolean) => {
        this.element.nativeElement.disabled = value;
      }
    );
  }

}
