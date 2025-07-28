import { Component, Input } from '@angular/core';
import { Card } from '../../../interfaces/dashboard.model';
import { Card as CardCOmponent } from './card/card';

@Component({
  selector: 'app-card-list',
  imports: [CardCOmponent],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
})
export class CardList {
  @Input() cards: Card[] = [];
}
