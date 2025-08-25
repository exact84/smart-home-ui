import { createAction, props } from '@ngrx/store';
import { DashboardData } from '@models/dashboard.model';

export const loadDashboard = createAction(
  '[Dashboard] Load Dashboard',
  props<{ dashboardId: string; tabId: string }>(),
);

export const loadDashboardSuccess = createAction(
  '[Dashboard] Load Dashboard Success',
  props<{ data: DashboardData; dashboardId: string; tabId: string }>(),
);

export const loadDashboardFailure = createAction(
  '[Dashboard] Load Dashboard Failure',
  props<{ error: string }>(),
);

export const selectTab = createAction(
  '[Dashboard] Select Tab',
  props<{ tabId: string }>(),
);
