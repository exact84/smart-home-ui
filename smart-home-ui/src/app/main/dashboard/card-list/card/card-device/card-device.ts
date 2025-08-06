import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SensorValuePipe } from '@pipes/sensor-value-pipe';
import { Card as CardType, DeviceItem } from '@models/index';
import { isSensor, isDevice } from 'app/type-guards/item-type-guard';

@Component({
  selector: 'app-card-device',
  imports: [CommonModule, MatIconModule, SensorValuePipe, MatSlideToggleModule],
  templateUrl: './card-device.html',
  styleUrl: './card-device.scss',
})
export class CardDevice {
  @Input() card!: CardType;
  readonly isSensor = isSensor;
  readonly isDevice = isDevice;
  onToggleDeviceState(item: DeviceItem, newState: boolean): void {
    item.state = newState;
  }
}
