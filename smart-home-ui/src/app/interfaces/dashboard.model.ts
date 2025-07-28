export interface DashboardData {
  tabs: Tab[];
}

export interface Tab {
  id: string;
  title: string;
  cards: Card[];
}

export interface Card {
  id: string;
  title: string;
  layout: 'horizontalLayout' | 'verticalLayout' | 'singleDevice';
  items: (SensorItem | DeviceItem)[];
}

interface BaseItem {
  type: 'sensor' | 'device';
  icon: string;
  label: string;
}

export interface SensorItem extends BaseItem {
  type: 'sensor';
  value: {
    amount: number;
    unit: string;
  };
}

export interface DeviceItem extends BaseItem {
  type: 'device';
  state: boolean;
}
