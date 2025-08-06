import { SensorItem, DeviceItem } from '@models/index';

export function isSensor(item: SensorItem | DeviceItem): item is SensorItem {
  return item.type === 'sensor';
}

export function isDevice(item: SensorItem | DeviceItem): item is DeviceItem {
  return item.type === 'device';
}
