import { createReducer, on } from '@ngrx/store';
import * as ItemListActions from './item-list.actions';
import { DeviceItem, SensorItem } from '@models/index';

export interface ItemListState {
  itemList: (DeviceItem | SensorItem)[];
  error: string | undefined;
}

export const initialState: ItemListState = {
  itemList: [],
  error: undefined,
};

export const itemListReducer = createReducer(
  initialState,

  on(ItemListActions.loadItemList, (state) => ({
    ...state,
    error: undefined,
  })),

  on(ItemListActions.loadItemListSuccess, (state, { itemList }) => ({
    ...state,
    itemList,
    error: undefined,
  })),

  on(ItemListActions.loadItemListFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(
    ItemListActions.toggleItemStateOptimistic,
    (state: ItemListState, { itemId, newState }) => ({
      ...state,
      itemList: state.itemList.map((item) =>
        item.id === itemId ? { ...item, state: newState } : item,
      ),
    }),
  ),

  on(
    ItemListActions.toggleItemStateRevert,
    (state: ItemListState, { itemId, prevState }) => ({
      ...state,
      itemList: state.itemList.map((item) =>
        item.id === itemId ? { ...item, state: prevState } : item,
      ),
    }),
  ),
);
