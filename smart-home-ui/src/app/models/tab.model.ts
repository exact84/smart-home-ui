import { Card } from './card.model';

export interface Tab {
  id: string;
  title: string;
  cards: Card[];
}
