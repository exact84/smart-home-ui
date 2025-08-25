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

@Injectable({ providedIn: 'root' })
export class DashboardFacade {
  store: Store<DashboardState> = inject(Store);
  router: Router = inject(Router);

  editMode = signal(false);

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
    console.log('From Facade, tabId: ', tabId);
    this.store.dispatch(DashboardActions.selectTab({ tabId }));
  }
}
