import { Component, Input } from '@angular/core';
import { Card as CardType } from '../../../../interfaces/dashboard.model';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NoContentPipe } from '../../../../pipes/no-content-pipe';

@Component({
  selector: 'app-card',
  imports: [MatIconModule, MatSlideToggleModule, NoContentPipe],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input() card!: CardType;

  onToggleDevice(label: string, state: boolean): void {
    console.log(`Device "${label}" state`, state);
    // обработка переключения
  }
}
