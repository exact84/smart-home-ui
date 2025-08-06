import { Component, Input } from '@angular/core';
import { Card, DeviceItem } from '@models/index';
import { Card as CardComponent } from './card/card';
import { HighlightActive } from '@directives/highlight-active';

@Component({
  selector: 'app-card-list',
  imports: [CardComponent, HighlightActive],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
})
export class CardList {
  @Input() cards: Card[] = [];
  hasActiveDevice(card: Card): boolean {
    return card.items.some(
      (item): item is DeviceItem =>
        item.type === 'device' && item.state === true,
    );
  }
}
