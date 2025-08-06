import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Card as CardType, DeviceItem } from '@models/index';
import { Sensor } from '../sensor/sensor';
import { Device } from '../device/device';
import { isSensor, isDevice } from 'app/type-guards/item-type-guard';

@Component({
  selector: 'app-card-vertical',
  imports: [CommonModule, Sensor, Device, MatSlideToggleModule],
  templateUrl: './card-vertical.html',
  styleUrl: './card-vertical.scss',
})
export class CardVertical {
  @Input() card!: CardType;
  readonly isSensor = isSensor;
  readonly isDevice = isDevice;

  onToggleDeviceState(item: DeviceItem, newState: boolean): void {
    item.state = newState;
  }
}
