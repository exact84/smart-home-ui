import { Component, effect, inject, Input, signal } from '@angular/core';
import { Tab } from '@models/index';
import { CardList } from '../card-list/card-list';
import { DashboardService } from '@services/dashboard';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab-switcher',
  imports: [CardList],
  templateUrl: './tab-switcher.html',
  styleUrl: './tab-switcher.scss',
})
export class TabSwitcher {
  @Input() tabs: Tab[] = [];
  readonly activeTabIndex = signal(0);
  dashboard = inject(DashboardService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const tabId = params.get('tabId');
      const dashboardId = params.get('dashboardId');
      const data = this.dashboard.dashboardData();

      if (!tabId || !dashboardId || data.tabs.length === 0) return;

      const index = data.tabs.findIndex((t) => t.id === tabId);
      if (index >= 0 && this.activeTabIndex() !== index) {
        this.activeTabIndex.set(index);
      }
    });
  }

  get activeTab(): Tab | undefined {
    const index = this.activeTabIndex();
    return this.tabs.length > index ? this.tabs[index] : undefined;
  }

  selectTab(index: number): void {
    this.activeTabIndex.set(index);
    const dashboardId = this.route.snapshot.paramMap.get('dashboardId');
    const data = this.dashboard.dashboardData();
    this.router.navigate([
      '/dashboard',
      dashboardId,
      data.tabs[this.activeTabIndex()].id,
    ]);
  }
}
