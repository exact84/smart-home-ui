import {
  Directive,
  effect,
  ElementRef,
  inject,
  Input,
  signal,
} from '@angular/core';

@Directive({
  selector: '[appHighlightActive]',
  standalone: true,
})
export class HighlightActive {
  private el = inject(ElementRef<HTMLElement>);
  private conditionSignal = signal(false);

  private readonly applyEffect = effect(this.toggleActiveBorder.bind(this));

  private toggleActiveBorder(): void {
    const isActive = this.conditionSignal();
    this.el.nativeElement.classList.toggle('active-border', isActive);
  }
  @Input('appHighlightActive') set condition(value: boolean) {
    this.conditionSignal.set(value);
  }
}
