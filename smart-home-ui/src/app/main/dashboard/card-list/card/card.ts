import { Component, Input } from '@angular/core';
import {
  Card as CardType,
  CardLayout,
  DeviceItem,
  SensorItem,
} from '@models/index';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CardHorizontal } from './card-horizontal/card-horizontal';
import { CardVertical } from './card-vertical/card-vertical';
import { CardDevice } from './card-device/card-device';

@Component({
  selector: 'app-card',
  imports: [
    MatIconModule,
    MatSlideToggleModule,
    CardHorizontal,
    CardVertical,
    CardDevice,
  ],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input() card!: CardType;

  isSensor(item: SensorItem | DeviceItem): item is SensorItem {
    return item.type === 'sensor';
  }

  isDevice(item: SensorItem | DeviceItem): item is DeviceItem {
    return item.type === 'device';
  }
  readonly layoutEnum = CardLayout;

  hasAnyState(): boolean {
    return this.card.items.filter((item) => 'state' in item).length >= 2;
  }

  get areAllDevicesOn(): boolean {
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

  onToggleDeviceState(item: DeviceItem, newState: boolean): void {
    item.state = newState;
  }
}
