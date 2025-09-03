import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import {
  routerNavigatedAction,
  RouterNavigatedAction,
} from '@ngrx/router-store';
import { DashboardService } from '@services/dashboard';
import * as DashboardActions from './dashboard.actions';
import {
  catchError,
  filter,
  map,
  mergeMap,
  of,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectDashboardId,
  selectTabId,
  selectTabs,
} from './dashboard.selectors';
import { DashboardFacade } from './dashboard.facade';

@Injectable()
export class DashboardEffects {
  private actions$ = inject(Actions);
  private dashboardService = inject(DashboardService);
  private router = inject(Router);
  private store = inject(Store);
  facade: DashboardFacade = inject(DashboardFacade);

  // Навигация
  routeToDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      switchMap((action: RouterNavigatedAction) => {
        console.log('routeToDashboard$');
        const root = action.payload.routerState.root;
        const dashboardId = root.firstChild?.firstChild?.params['dashboardId'];
        const tabId = root.firstChild?.firstChild?.params['tabId'];

        return this.dashboardService.getDashboardList().pipe(
          map((list) => {
            const exists = list.some((d) => d.id === dashboardId);
            const finalDashboardId = exists ? dashboardId : list?.[0]?.id;

            if (this.facade.editMode()) {
              return DashboardActions.noop();
            }

            if (!finalDashboardId) {
              return DashboardActions.loadDashboardFailure({
                error: 'No dashboards available',
              });
            }

            return DashboardActions.loadDashboard({
              dashboardId: finalDashboardId,
              tabId,
            });
          }),
          catchError((error) =>
            of(DashboardActions.loadDashboardFailure({ error })),
          ),
        );
      }),
    ),
  );

  // Загрузка данных
  loadDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadDashboard),
      switchMap(({ dashboardId, tabId }) =>
        this.dashboardService.getDashboardData(dashboardId).pipe(
          map((data) => {
            console.log('loadDashboard$: ', dashboardId, tabId, data.tabs);
            const tabs = data.tabs ?? [];
            if (!tabs.length) {
              this.router.navigate(['/dashboard', dashboardId]);
              return DashboardActions.loadDashboardSuccess({
                data,
                dashboardId,
                tabId: '',
              });
            }
            const valid = tabs.some((t) => t.id === tabId);
            if (valid) console.log('tabId is valid');
            const finalTabId = valid ? tabId : (tabs[0]?.id ?? '');
            // if (tabId !== finalTabId) {
            console.log('tabId: ', tabId, 'finalTabId: ', finalTabId);
            this.router.navigate(['/dashboard', dashboardId, finalTabId]);
            // }

            return DashboardActions.loadDashboardSuccess({
              data,
              dashboardId,
              tabId: finalTabId,
            });
          }),
          catchError((error) =>
            of(DashboardActions.loadDashboardFailure({ error })),
          ),
        ),
      ),
    ),
  );

  // Выбор таба
  selectTab$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DashboardActions.selectTab),
        switchMap(({ tabId }) =>
          this.store.select(selectDashboardId).pipe(
            filter((dashboardId): dashboardId is string => !!dashboardId),
            take(1),
            tap((dashboardId) => {
              console.log('selectTab$: ', dashboardId, tabId);
              this.router.navigate(['/dashboard', dashboardId, tabId]);
            }),
          ),
        ),
      ),
    { dispatch: false },
  );

  // Сохранение изменений
  saveTabsOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.updateDashboard),
      mergeMap(({ dashboardId, data }) =>
        this.dashboardService.updateDashboard(dashboardId, data).pipe(
          map((updated) =>
            DashboardActions.updateDashboardSuccess({ data: updated }),
          ),
          catchError((e) => of(DashboardActions.updateDashboardFailure(e))),
        ),
      ),
    ),
  );

  addTab$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.addTab),
      map(({ tabId: id }) => {
        console.log('addTab$: ', id);
        return DashboardActions.selectTab({ tabId: id });
      }),
    ),
  );

  deleteTab$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.deleteTab),
      withLatestFrom(
        this.store.select(selectTabs),
        this.store.select(selectDashboardId),
      ),
      map(([{ tabId }, tabs, dashboardId]) => {
        const remaining = tabs.filter((t) => t.id !== tabId);

        if (remaining.length > 0) {
          const newActive = remaining[0];
          this.router.navigate(['/dashboard', dashboardId, newActive.id]);
          return DashboardActions.selectTab({ tabId: newActive.id });
        } else {
          this.router.navigate(['/dashboard', dashboardId]);
          return DashboardActions.selectTab({ tabId: '' });
        }
      }),
    ),
  );
}
