import { createAction, props } from '@ngrx/store';
import { DashboardData } from '@models/dashboard.model';
import { Card } from '@models/card.model';

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

export const reorderCard = createAction(
  '[Dashboard] Reorder Card',
  props<{ tabId: string; cardId: string; direction: 'left' | 'right' }>(),
);

export const toggleDevice = createAction(
  '[Dashboard] Toggle Device',
  props<{ deviceId: string; status: boolean }>(),
);

export const toggleDeviceSuccess = createAction(
  '[Dashboard] Toggle Device Success',
  props<{ deviceId: string; status: boolean }>(),
);

export const toggleDeviceFailure = createAction(
  '[Dashboard] Toggle Device Failure',
  props<{ deviceId: string; error: string }>(),
);

export const addCard = createAction(
  '[Dashboard] Add Card',
  props<{ tabId: string; card: Card }>(),
);

export const updateCard = createAction(
  '[Dashboard] Update Card',
  props<{ tabId: string; card: Card }>(),
);

export const deleteCard = createAction(
  '[Dashboard] Delete Card',
  props<{ tabId: string; cardId: string }>(),
);
