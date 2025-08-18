import { Component, effect, inject, Input, signal } from '@angular/core';
import { Tab } from '@models/index';
import { CardList } from '../card-list/card-list';
import { DashboardService } from '@services/dashboard';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    effect(() => {
      const data = this.dashboard.dashboardData();
      const tabId = this.route.snapshot.paramMap.get('tabId');
      const dashboardId = this.route.snapshot.paramMap.get('dashboardId');
      if (!tabId || !dashboardId || data.tabs.length === 0) return;

      const index = data.tabs.findIndex((t) => t.id === tabId);
      if (index >= 0 && this.activeTabIndex() !== index) {
        this.activeTabIndex.set(index);
      }
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const dashboardId = params.get('dashboardId');
      if (dashboardId) {
        this.dashboard.getDashboardData(dashboardId);
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
