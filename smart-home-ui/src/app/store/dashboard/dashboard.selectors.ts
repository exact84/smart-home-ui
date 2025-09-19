import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.reducer';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateSnapshot } from '@angular/router';

export const selectDashboardState =
  createFeatureSelector<DashboardState>('dashboard');

export const selectDashboardData = createSelector(
  selectDashboardState,
  (state) => state.data,
);

export const selectDashboardError = createSelector(
  selectDashboardState,
  (state) => state.error,
);

export const selectDashboardLoading = createSelector(
  selectDashboardState,
  (state) => state.loading,
);

export const selectDashboardId = createSelector(
  selectDashboardState,
  (state) => state.dashboardId,
);

export const selectTabId = createSelector(
  selectDashboardState,
  (state) => state.tabId,
);

export const selectTabs = createSelector(
  selectDashboardData,
  (data) => data?.tabs ?? [],
);

export const selectRouterState =
  createFeatureSelector<RouterReducerState<RouterStateSnapshot>>('router');

export const selectRouteParams = createSelector(selectRouterState, (router) => {
  let route = router.state?.root;
  while (route?.firstChild) {
    route = route.firstChild;
  }

  return {
    dashboardId: route?.params['dashboardId'],
    tabId: route?.params['tabId'],
  };
});

// For update card when editing
export const selectCards = (tabId: string) =>
  createSelector(
    selectDashboardState,
    (state) =>
      [...(state.data?.tabs ?? [])].find((tab) => tab.id === tabId)?.cards ??
      [],
  );
