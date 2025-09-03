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

  on(DashboardActions.addTab, (state, { title, tabId }) => {
    const tabs = [...(state.data?.tabs ?? []), { id: tabId, title, cards: [] }];

    return {
      ...state,
      data: state.data ? { ...state.data, tabs } : { tabs },
      tabId,
    };
  }),

  on(DashboardActions.deleteTab, (state, { tabId }) => ({
    ...state,
    data: {
      ...state.data,
      tabs: state.data!.tabs.filter((tab) => tab.id !== tabId),
    },
    tabId: state.tabId === tabId ? null : state.tabId, // если удаляем активный таб, то переключаемся на первый
  })),

  on(DashboardActions.reorderTab, (state, { tabId, direction }) => {
    const tabs = [...state.data!.tabs];
    const index = tabs.findIndex((t) => t.id === tabId);

    const newIndex = direction === 'left' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= tabs.length) return state;

    [tabs[index], tabs[newIndex]] = [tabs[newIndex], tabs[index]];

    return {
      ...state,
      data: {
        ...state.data,
        tabs,
      },
    };
  }),

  on(DashboardActions.updateDashboardSuccess, (state, { data }) => ({
    ...state,
    data,
  })),
);
