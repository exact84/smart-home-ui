import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SensorItem } from '@models/index';
import { MatIconModule } from '@angular/material/icon';
import { SensorValuePipe } from '@pipes/sensor-value-pipe';

@Component({
  selector: 'app-sensor',
  imports: [CommonModule, MatIconModule, SensorValuePipe],
  templateUrl: './sensor.html',
  styleUrl: './sensor.scss',
})
export class Sensor {
  @Input({ required: true }) item!: SensorItem;
}
