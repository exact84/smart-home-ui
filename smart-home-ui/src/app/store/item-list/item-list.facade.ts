import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ItemListActions from './item-list.actions';
import * as ItemListSelectors from './item-list.selectors';

@Injectable({ providedIn: 'root' })
export class ItemListFacade {
  private readonly store = inject(Store);

  readonly itemList = this.store.selectSignal(
    ItemListSelectors.selectAllItemList,
  );
  readonly error = this.store.selectSignal(
    ItemListSelectors.selectItemListError,
  );

  loadItemList(): void {
    this.store.dispatch(ItemListActions.loadItemList());
  }

  toggleItemState(itemId: string, newState: boolean): void {
    this.store.dispatch(
      ItemListActions.toggleItemStateOptimistic({ itemId, newState }),
    );
  }
}
