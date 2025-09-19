import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ItemListActions from './item-list.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ItemListService } from '@services/item-list.service';

@Injectable()
export class ItemListEffects {
  private actions$ = inject(Actions);
  private itemListService = inject(ItemListService);

  loadItemList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemListActions.loadItemList),
      mergeMap(() =>
        this.itemListService.getAllItemList().pipe(
          map((itemList) => ItemListActions.loadItemListSuccess({ itemList })),
          catchError((error) =>
            of(ItemListActions.loadItemListFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  toggleItemState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemListActions.toggleItemStateOptimistic),
      mergeMap(({ itemId, newState }) =>
        this.itemListService.updateItemState(itemId, newState).pipe(
          map(() =>
            ItemListActions.toggleItemStateSuccess({ itemId, newState }),
          ),
          catchError(() =>
            of(
              ItemListActions.toggleItemStateRevert({
                itemId,
                prevState: !newState,
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
