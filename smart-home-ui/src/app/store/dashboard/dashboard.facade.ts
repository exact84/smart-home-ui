import { Injectable, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { DashboardState } from './dashboard.reducer';
import * as DashboardActions from './dashboard.actions';
import {
  selectDashboardData,
  selectDashboardError,
  selectDashboardLoading,
  selectTabId,
} from './dashboard.selectors';
import { Router } from '@angular/router';
import { DashboardData } from '@models/dashboard.model';
import { Tab } from '@models/tab.model';
import { Card } from '@models/card.model';
import { map } from 'rxjs';
import { deleteDashboard } from '@store/dashboard-list/dashboard-list.actions';

@Injectable({ providedIn: 'root' })
export class DashboardFacade {
  store: Store<DashboardState> = inject(Store);
  router: Router = inject(Router);

  editMode = signal(false);
  newTab = signal(false);

  toggleEditMode() {
    this.editMode.update((v) => !v);
  }

  dashboardData$ = this.store.select(selectDashboardData);
  tabId$ = this.store.select(selectTabId);
  error$ = this.store.select(selectDashboardError);
  loading$ = this.store.select(selectDashboardLoading);

  loadDashboard(dashboardId: string, tabId: string) {
    this.store.dispatch(DashboardActions.loadDashboard({ dashboardId, tabId }));
  }

  selectTab(tabId: string) {
    this.store.dispatch(DashboardActions.selectTab({ tabId }));
  }

  private generateTabId(title: string): string {
    const normalized = title.toLowerCase().replaceAll(/\s+/g, '-');
    const random = Math.random().toString(36).slice(2, 6);
    return `${normalized}-${random}`;
  }

  addTab(title: string) {
    this.newTab.set(true);
    const tabId = this.generateTabId(title);
    this.store.dispatch(DashboardActions.addTab({ tabId, title }));
  }

  removeTab(tabId: string) {
    this.store.dispatch(DashboardActions.deleteTab({ tabId }));
  }

  reorderTab(tabId: string, direction: 'left' | 'right') {
    this.store.dispatch(DashboardActions.reorderTab({ tabId, direction }));
  }

  updateDashboard(dashboardId: string, tabs: Tab[]) {
    const data: DashboardData = { tabs };
    this.store.dispatch(
      DashboardActions.updateDashboard({ dashboardId, data }),
    );
  }

  deleteDashboard(dashboardId: string) {
    this.store.dispatch(deleteDashboard({ dashboardId }));
  }

  getCard(tabId: string, cardId: string) {
    return this.store
      .select(selectDashboardData)
      .pipe(
        map((data) =>
          data?.tabs
            .find((t) => t.id === tabId)
            ?.cards.find((c) => c.id === cardId),
        ),
      );
  }

  reorderCard(tabId: string, cardId: string, direction: 'left' | 'right') {
    this.store.dispatch(
      DashboardActions.reorderCard({ tabId, cardId, direction }),
    );
  }

  toggleDevice(deviceId: string, status: boolean) {
    this.store.dispatch(DashboardActions.toggleDevice({ deviceId, status }));
  }

  addCard(tabId: string, card: Card) {
    this.store.dispatch(DashboardActions.addCard({ tabId, card }));
  }

  updateCard(tabId: string, card: Card) {
    this.store.dispatch(DashboardActions.updateCard({ tabId, card }));
  }

  deleteCard(tabId: string, cardId: string) {
    this.store.dispatch(DashboardActions.deleteCard({ tabId, cardId }));
  }
}
