import { createReducer, on } from '@ngrx/store';
import * as dashboardListActions from './dashboard-list.actions';
import { DashboardList } from '@models/dashboard-list.model';

export interface DashboardListState {
  dashboards: DashboardList[];
  loading: boolean;
  error: string | undefined;
}

export const initialDashboardListState: DashboardListState = {
  dashboards: [],
  loading: false,
  error: undefined,
};
export const dashboardListReducer = createReducer(
  initialDashboardListState,

  on(dashboardListActions.createDashboard, (state) => ({
    ...state,
    loading: true,
    error: undefined,
  })),

  on(dashboardListActions.createDashboardSuccess, (state, { dashboard }) => ({
    ...state,
    dashboards: [...state.dashboards, dashboard],
    loading: false,
  })),

  on(dashboardListActions.createDashboardFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(dashboardListActions.deleteDashboard, (state) => ({
    ...state,
    loading: true,
    error: undefined,
  })),

  on(dashboardListActions.deleteDashboardSuccess, (state, { dashboardId }) => ({
    ...state,
    dashboards: state.dashboards.filter((d) => d.id !== dashboardId),
    loading: false,
  })),

  on(dashboardListActions.deleteDashboardFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
