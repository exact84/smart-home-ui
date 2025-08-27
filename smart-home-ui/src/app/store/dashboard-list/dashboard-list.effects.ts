import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DashboardService } from '@services/dashboard';
import * as dashboardListActions from './dashboard-list.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class DashboardListEffects {
  private actions$ = inject(Actions);
  private dashboardService = inject(DashboardService);

  createDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dashboardListActions.createDashboard),
      mergeMap(({ dashboard }) => {
        console.log('saving dashboard: ', dashboard);
        return this.dashboardService.createDashboard(dashboard).pipe(
          map((createdDashboard) => {
            this.dashboardService.getDashboardList().subscribe((list) => {
              this.dashboardService.dashboardList.set(list);
            });
            return dashboardListActions.createDashboardSuccess({
              dashboard: createdDashboard,
            });
          }),
          catchError((error) =>
            of(
              dashboardListActions.createDashboardFailure({
                error: error.message,
              }),
            ),
          ),
        );
      }),
    ),
  );

  deleteDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dashboardListActions.deleteDashboard),
      mergeMap(({ dashboardId }) =>
        this.dashboardService.deleteDashboard(dashboardId).pipe(
          map(() => {
            return dashboardListActions.deleteDashboardSuccess({ dashboardId });
          }),
          catchError((error) =>
            of(dashboardListActions.deleteDashboardFailure({ error })),
          ),
        ),
      ),
    ),
  );
}
