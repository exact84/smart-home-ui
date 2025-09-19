import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  Input,
  signal,
  OnInit,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SensorValuePipe } from '@pipes/sensor-value-pipe';
import { Card as CardType, DeviceItem } from '@models/index';
import { isSensor, isDevice } from 'app/type-guards/item-type-guard';
import { ItemListFacade } from '@store/item-list/item-list.facade';

@Component({
  selector: 'app-card-device',
  imports: [CommonModule, MatIconModule, SensorValuePipe, MatSlideToggleModule],
  templateUrl: './card-device.html',
  styleUrl: './card-device.scss',
})
export class CardDevice implements OnInit {
  readonly isSensor = isSensor;
  readonly isDevice = isDevice;
  itemListFacade = inject(ItemListFacade);
  @Input() onToggle!: (item: DeviceItem, newState: boolean) => void;
  readonly itemList = this.itemListFacade.itemList;
  @Input() set card(value: CardType) {
    this.cardSignal.set(value);
  }
  readonly cardSignal = signal<CardType | undefined>(undefined);

  readonly item = computed(() => {
    const card = this.cardSignal();
    const raw = card?.items[0];
    return raw && (isSensor(raw) || isDevice(raw)) ? raw : undefined;
  });

  state: boolean = false;
  onToggleDeviceState(item: DeviceItem): void {
    this.state = !this.state;
    this.itemListFacade.toggleItemState(item.id, this.state);
  }

  ngOnInit(): void {
    // For receiving initial state
    const item = this.item();
    if (!item) return;
    if (isDevice(item)) this.state = item.state;
  }
}
