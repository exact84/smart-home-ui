import { createReducer, on } from '@ngrx/store';
import * as DashboardActions from './dashboard.actions';
import { DashboardData } from '@models/dashboard.model';
import { DashboardList } from '@models/dashboard-list.model';

export interface DashboardState {
  dashboardList: DashboardList | undefined;
  data: DashboardData | undefined;
  dashboardId: string | undefined;
  tabId: string | undefined;
  loading: boolean;
  error: string | undefined;
}

export const initialState: DashboardState = {
  dashboardList: undefined,
  data: undefined,
  dashboardId: undefined,
  tabId: undefined,
  loading: false,
  error: undefined,
};

export const dashboardReducer = createReducer(
  initialState,

  on(DashboardActions.loadDashboard, (state, { dashboardId, tabId }) => ({
    ...state,
    dashboardId,
    tabId,
    loading: true,
    error: undefined,
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
    tabId: state.tabId === tabId ? undefined : state.tabId, // if tab is deleted, then switch to first tab
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

  on(DashboardActions.reorderCard, (state, { tabId, cardId, direction }) => {
    if (!state.data) return state;

    const tabs = state.data.tabs.map((tab) => {
      if (tab.id !== tabId) return tab;

      const cards = [...tab.cards];
      const index = cards.findIndex((c) => c.id === cardId);
      if (index === -1) return tab;

      const newIndex = direction === 'left' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= cards.length) return tab;

      [cards[index], cards[newIndex]] = [cards[newIndex], cards[index]];

      return { ...tab, cards };
    });

    return {
      ...state,
      data: { ...state.data, tabs },
    };
  }),

  on(DashboardActions.addCard, (state, { tabId, card }) => {
    const tabs = state.data!.tabs.map((tab) =>
      tab.id === tabId ? { ...tab, cards: [...tab.cards, card] } : tab,
    );
    return {
      ...state,
      data: { ...state.data!, tabs },
    };
  }),

  on(DashboardActions.updateCard, (state, { tabId, card }) => {
    const tabs = state.data!.tabs.map((tab) =>
      tab.id === tabId
        ? {
            ...tab,
            cards: tab.cards.map((c) =>
              c.id === card.id ? { ...c, ...card } : c,
            ),
          }
        : tab,
    );
    return {
      ...state,
      data: { ...state.data!, tabs },
    };
  }),

  on(DashboardActions.deleteCard, (state, { tabId, cardId }) => {
    const tabs = state.data!.tabs.map((tab) =>
      tab.id === tabId
        ? { ...tab, cards: tab.cards.filter((c) => c.id !== cardId) }
        : tab,
    );
    return {
      ...state,
      data: { ...state.data!, tabs },
    };
  }),
);
