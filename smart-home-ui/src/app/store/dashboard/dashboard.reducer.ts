import { createReducer, on } from '@ngrx/store';
import * as DashboardActions from './dashboard.actions';
import { DashboardData } from '@models/dashboard.model';
import { DashboardList } from '@models/dashboard-list.model';

export interface DashboardState {
  dashboardList: DashboardList | null;
  data: DashboardData | null;
  dashboardId: string | null;
  tabId: string | null;
  loading: boolean;
  error: string | null;
}

export const initialState: DashboardState = {
  dashboardList: null,
  data: null,
  dashboardId: null,
  tabId: null,
  loading: false,
  error: null,
};

export const dashboardReducer = createReducer(
  initialState,

  on(DashboardActions.loadDashboard, (state, { dashboardId, tabId }) => ({
    ...state,
    selectedDashboardId: dashboardId,
    tabId,
    loading: true,
    error: null,
  })),

  on(
    DashboardActions.loadDashboardSuccess,
    (state, { data, dashboardId, tabId }) => ({
      ...state,
      data,
      dashboardId,
      tabId,
      loading: false,
    }),
  ),

  on(DashboardActions.loadDashboardFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(DashboardActions.selectTab, (state, { tabId }) => ({
    ...state,
    tabId,
  })),
);
