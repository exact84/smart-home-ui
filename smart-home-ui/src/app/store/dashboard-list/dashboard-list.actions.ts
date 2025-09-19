import { DashboardList } from '@models/dashboard-list.model';
import { createAction, props } from '@ngrx/store';

export const createDashboard = createAction(
  '[Dashboard] Create',
  props<{ dashboard: DashboardList }>(),
);

export const createDashboardSuccess = createAction(
  '[Dashboard] Create Success',
  props<{ dashboard: DashboardList }>(),
);

export const createDashboardFailure = createAction(
  '[Dashboard] Create Failure',
  props<{ error: string }>(),
);

export const deleteDashboard = createAction(
  '[Dashboard] Delete',
  props<{ dashboardId: string }>(),
);

export const deleteDashboardSuccess = createAction(
  '[Dashboard] Delete Success',
  props<{ dashboardId: string }>(),
);

export const deleteDashboardFailure = createAction(
  '[Dashboard] Delete Failure',
  props<{ error: string }>(),
);
