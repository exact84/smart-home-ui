import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabSwitcher } from './tab-switcher/tab-switcher';
import { DashboardService } from '@services/dashboard';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [TabSwitcher, CommonModule, MatIconModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  dashboard = inject(DashboardService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  private subscription: Subscription = new Subscription();
  private lastDashboardId: string | null = null;

  normalizeRouteEffect = effect(() => {
    const data = this.dashboard.dashboardData();
    const currentDashboardId = data.dashboardId;
    const tabs = data.tabs;

    const routeDashboardId = this.route.snapshot.paramMap.get('dashboardId');
    const routeTabId = this.route.snapshot.paramMap.get('tabId');

    if (routeDashboardId !== null) {
      const list = this.dashboard.dashboardList();
      const found = list.find((d) => d.id === routeDashboardId);
      if (found && currentDashboardId !== routeDashboardId) {
        this.dashboard.selectDashboard(found);
        return;
      }
    }

    if (tabs.length === 0) return;

    const isValidTab = tabs.some((t) => t.id === routeTabId);
    if (!isValidTab) {
      this.router.navigate(['/dashboard', currentDashboardId, tabs[0].id]);
      return;
    }
  });

  ngOnInit() {
    this.subscription.add(
      this.route.paramMap.subscribe((params) => {
        const dashboardId = params.get('dashboardId');

        const shouldLoad =
          this.dashboard.dashboardList().length === 0 ||
          dashboardId !== this.lastDashboardId;
        if (shouldLoad) {
          this.dashboard.getDashboardList(dashboardId || undefined);
          this.lastDashboardId = dashboardId;
        }
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async onDashboardSelect(dashboardId: string) {
    this.dashboard.getDashboardData(dashboardId);
    this.router.navigate([
      '/dashboard',
      dashboardId,
      this.dashboard.selectedTab(),
    ]);
  }

  onTabSelect(tabId: string) {
    this.dashboard.setTab(tabId);
    this.router.navigate([
      '/dashboard',
      this.dashboard.selectedDashboard().id,
      tabId,
    ]);
  }
}
