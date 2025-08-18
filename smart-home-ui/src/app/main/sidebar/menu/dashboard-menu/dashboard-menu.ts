import { Component, effect, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { DashboardList } from '@models/dashboard-list.model';
import { DashboardService } from '@services/dashboard';

@Component({
  selector: 'app-dashboard-menu',
  imports: [MatIconModule],
  templateUrl: './dashboard-menu.html',
  styleUrl: './dashboard-menu.scss',
})
export class DashboardMenu {
  dashboard = inject(DashboardService);
  router = inject(Router);

  onDashboardClick(selectedDashboard: DashboardList) {
    if (this.dashboard.selectedDashboard()?.id === selectedDashboard.id) {
      return;
    }
    this.dashboard.selectDashboard(selectedDashboard);
    const data = this.dashboard.dashboardData();
    this.router.navigate(['/dashboard', selectedDashboard.id, data.tabs[0].id]);
  }
}
