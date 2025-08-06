import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceItem } from '@models/index';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-device',
  imports: [CommonModule, MatIconModule, MatSlideToggleModule],
  templateUrl: './device.html',
  styleUrl: './device.scss',
})
export class Device {
  @Input({ required: true }) item!: DeviceItem;

  toggleState(newState: boolean): void {
    this.item.state = newState;
  }
}
