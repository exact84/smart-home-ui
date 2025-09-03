import { Injectable, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { DashboardState } from './dashboard.reducer';
import * as DashboardActions from './dashboard.actions';
import {
  selectDashboardData,
  selectDashboardError,
  selectDashboardLoading,
  selectTabId,
  selectTabs,
} from './dashboard.selectors';
import { Router } from '@angular/router';
import { DashboardData } from '@models/dashboard.model';
import { firstValueFrom } from 'rxjs';
import { Tab } from '@models/tab.model';

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
    console.log('From Facade selectTab, tabId: ', tabId);
    this.store.dispatch(DashboardActions.selectTab({ tabId }));
  }

  private generateTabId(title: string): string {
    const normalized = title.toLowerCase().replace(/\s+/g, '-');
    const random = Math.random().toString(36).substring(2, 6);
    return `${normalized}-${random}`;
  }

  addTab(title: string) {
    this.newTab.set(true);
    const tabId = this.generateTabId(title);
    this.store.dispatch(DashboardActions.addTab({ tabId, title }));
  }

  removeTab(tabId: string) {
    console.log('From Facade removeTab, tabId: ', tabId);
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

  //   updateTabTitle(tabId: string, newTitle: string) {
  //   this.store.dispatch(DashboardActions.updateTabTitle({ tabId, title: newTitle }));
  // }
}
