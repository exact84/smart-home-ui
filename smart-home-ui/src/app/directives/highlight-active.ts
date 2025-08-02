import { Directive, ElementRef, inject, Input } from '@angular/core';

@Directive({
  selector: '[appHighlightActive]',
  standalone: true,
})
export class HighlightActive {
  private el = inject(ElementRef<HTMLElement>);
  @Input('appHighlightActive') set condition(value: boolean) {
    this.el.nativeElement.classList.toggle('active-border', value);
  }
}
