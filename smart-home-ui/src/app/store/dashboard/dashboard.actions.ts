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

export const noop = createAction('[Dashboard] Noop');

export const selectTab = createAction(
  '[Dashboard] Select Tab',
  props<{ tabId: string }>(),
);

export const addTab = createAction(
  '[Dashboard] Add Tab',
  props<{ tabId: string; title: string }>(),
);

export const deleteTab = createAction(
  '[Dashboard] Remove Tab',
  props<{ tabId: string }>(),
);

export const reorderTab = createAction(
  '[Dashboard] Reorder Tab',
  props<{ tabId: string; direction: 'left' | 'right' }>(),
);

export const updateDashboard = createAction(
  '[Dashboard] Save Tabs Order',
  props<{ dashboardId: string; data: DashboardData }>(),
);

export const updateDashboardSuccess = createAction(
  '[Dashboard] Save Tabs Order Success',
  props<{ data: DashboardData }>(),
);

export const updateDashboardFailure = createAction(
  '[Dashboard] Save Tabs Order Success',
  props<{ error: string }>(),
);
