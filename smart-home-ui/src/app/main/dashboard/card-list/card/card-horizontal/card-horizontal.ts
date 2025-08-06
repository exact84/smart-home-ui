import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card as CardType } from '@models/index';
import { Sensor } from '../sensor/sensor';
import { isSensor } from 'app/type-guards/item-type-guard';

@Component({
  selector: 'app-card-horizontal',
  imports: [CommonModule, Sensor],
  templateUrl: './card-horizontal.html',
  styleUrl: './card-horizontal.scss',
})
export class CardHorizontal {
  @Input() card!: CardType;
  readonly isSensor = isSensor;
}
