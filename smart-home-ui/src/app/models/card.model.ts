import { DeviceItem, SensorItem } from './item.model';

export enum CardLayout {
  Horizontal = 'horizontalLayout',
  Vertical = 'verticalLayout',
  SingleDevice = 'singleDevice',
}

export interface Card {
  id: string;
  title: string;
  layout: CardLayout;
  items: (SensorItem | DeviceItem)[];
}
