import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardList } from '@models/dashboard-list.model';
import { Store } from '@ngrx/store';
import { DashboardService } from '@services/dashboard';
import { loadDashboard } from 'app/store/dashboard/dashboard.actions';
import { AddDashboard } from '../add-dashboard/add-dashboard';
import { MatIconModule } from '@angular/material/icon';

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
  dashboardList = this.dashboard.dashboardList;

  constructor() {
    this.dashboard.getDashboardList().subscribe((dashboardList) => {
      this.dashboardList.set(dashboardList);
    });
  }

  onDashboardClick(selectedDashboard: DashboardList) {
    this.store.dispatch(
      loadDashboard({ dashboardId: selectedDashboard.id, tabId: '' }),
    );
  }
}
