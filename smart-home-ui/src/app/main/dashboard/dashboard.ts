import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabSwitcher } from './tab-switcher/tab-switcher';
import { DashboardService } from '@services/dashboard';
import { MatIconModule } from '@angular/material/icon';
import { DashboardFacade } from 'app/store/dashboard/dashboard.facade';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [TabSwitcher, CommonModule, MatIconModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  facade: DashboardFacade = inject(DashboardFacade);
  dashboard = inject(DashboardService);

  dashboard$ = this.facade.dashboardData$!;
  error$ = this.facade.error$;
  loading$ = this.facade.loading$;
  editMode = this.facade.editMode;

  onDashboardSelect(dashboardId: string) {
    this.dashboard.getDashboardData(dashboardId);
  }
}
