import { Component, Input } from '@angular/core';
import { Card as CardType } from '../../../../interfaces/dashboard.model';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NoContentPipe } from '../../../../pipes/no-content-pipe';

@Component({
  selector: 'app-card',
  imports: [MatIconModule, MatSlideToggleModule, NoContentPipe],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input() card!: CardType;

  hasAnyState(): boolean {
    return this.card.items.filter((item) => 'state' in item).length >= 2;
  }

  get areAllDevicesOn(): boolean {
    console.log('areAllDevicesOn recalculated');
    const result = this.card.items
      .filter((item) => 'state' in item)
      .some((item) => item.state === true);
    return result;
  }

  toggleAllDevices(state: boolean): void {
    for (const item of this.card.items) {
      if ('state' in item) {
        item.state = state;
      }
    }
  }
}
