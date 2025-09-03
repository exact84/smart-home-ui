import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardList } from '@models/dashboard-list.model';
import { Store } from '@ngrx/store';
import { DashboardService } from '@services/dashboard';
import { loadDashboard } from 'app/store/dashboard/dashboard.actions';
import { AddDashboard } from '../add-dashboard/add-dashboard';
import { MatIconModule } from '@angular/material/icon';
import { DashboardFacade } from '@store/dashboard/dashboard.facade';

@Component({
  selector: 'app-dashboard-menu',
  imports: [MatIconModule, AddDashboard],
  templateUrl: './dashboard-menu.html',
  styleUrl: './dashboard-menu.scss',
})
export class DashboardMenu {
  dashboard = inject(DashboardService);
  router = inject(Router);
  private store = inject(Store);
  facade: DashboardFacade = inject(DashboardFacade);
  dashboardList = this.dashboard.dashboardList;
  editMode = this.facade.editMode;

  constructor() {
    this.dashboard.getDashboardList().subscribe((dashboardList) => {
      this.dashboardList.set(dashboardList);
    });
  }

  onDashboardClick(selectedDashboard: DashboardList) {
    if (this.editMode()) {
      // не переходить если в режиме редактирования
      return;
    }
    this.store.dispatch(
      loadDashboard({ dashboardId: selectedDashboard.id, tabId: '' }),
    );
  }
}
