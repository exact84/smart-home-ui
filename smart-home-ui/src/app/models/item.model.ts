interface BaseItem {
  type: 'sensor' | 'device';
  icon: string;
  label: string;
  id: string;
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
