import { Component, Input } from '@angular/core';
import { Card as CardType } from '../../../../interfaces/dashboard.model';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { CardList } from '../card-list/card-list';

@Component({
  selector: 'app-card',
  imports: [MatIconModule, MatSlideToggleModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input() card!: CardType;
}
