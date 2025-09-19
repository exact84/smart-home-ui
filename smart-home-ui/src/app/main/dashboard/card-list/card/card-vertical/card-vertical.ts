import { Component, computed, inject, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Card as CardType, DeviceItem } from '@models/index';
import { Sensor } from '../sensor/sensor';
import { Device } from '../device/device';
import { isSensor, isDevice } from 'app/type-guards/item-type-guard';
import { ItemListFacade } from '@store/item-list/item-list.facade';

@Component({
  selector: 'app-card-vertical',
  imports: [CommonModule, Sensor, Device, MatSlideToggleModule],
  templateUrl: './card-vertical.html',
  styleUrl: './card-vertical.scss',
})
export class CardVertical {
  readonly isSensor = isSensor;
  readonly isDevice = isDevice;
  itemListFacade = inject(ItemListFacade);
  @Input() onToggle!: (item: DeviceItem, newState: boolean) => void;
  readonly itemList = this.itemListFacade.itemList;
  @Input() set card(value: CardType) {
    this.cardSignal.set(value);
  }
  readonly cardSignal = signal<CardType>({} as CardType);

  readonly deviceItems = computed(() => {
    const items = this.cardSignal().items ?? [];
    return this.itemList().filter((i): i is DeviceItem =>
      items.some((c) => c.id === i.id),
    );
  });

  onToggleDeviceState(item: DeviceItem, newState: boolean): void {
    item.state = newState;
  }
}
