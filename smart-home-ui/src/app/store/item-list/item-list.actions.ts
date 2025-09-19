import { createAction, props } from '@ngrx/store';
import { DeviceItem, SensorItem } from '@models/index';

export const loadItemList = createAction('[ItemList] Load');

export const loadItemListSuccess = createAction(
  '[ItemList] Load Success',
  props<{ itemList: (DeviceItem | SensorItem)[] }>(),
);

export const loadItemListFailure = createAction(
  '[ItemList] Load Failure',
  props<{ error: string }>(),
);

export const toggleItemStateOptimistic = createAction(
  '[ItemList] Toggle Item State Optimistic',
  props<{ itemId: string; newState: boolean }>(),
);

export const toggleItemStateSuccess = createAction(
  '[ItemList] Toggle Item State Success',
  props<{ itemId: string; newState: boolean }>(),
);

export const toggleItemStateRevert = createAction(
  '[ItemList] Toggle Item State Revert',
  props<{ itemId: string; prevState: boolean }>(),
);
