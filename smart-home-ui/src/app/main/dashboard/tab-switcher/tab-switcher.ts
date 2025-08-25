import { Component, inject, signal } from '@angular/core';
import { Tab } from '@models/index';
import { CardList } from '../card-list/card-list';
import { DashboardService } from '@services/dashboard';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';
import { selectTabId, selectTabs } from '@store/dashboard/dashboard.selectors';
import { AsyncPipe } from '@angular/common';
import { DashboardFacade } from '@store/dashboard/dashboard.facade';

@Component({
  selector: 'app-tab-switcher',
  imports: [CardList, AsyncPipe],
  templateUrl: './tab-switcher.html',
  styleUrl: './tab-switcher.scss',
})
export class TabSwitcher {
  readonly activeTabIndex = signal(0);
  dashboard = inject(DashboardService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  private store = inject(Store);
  facade: DashboardFacade = inject(DashboardFacade);
  readonly tabs$ = this.store.select(selectTabs);

  readonly activeTab$ = combineLatest([
    this.store.select(selectTabId),
    this.tabs$,
  ]).pipe(map(([tabId, tabs]) => tabs.find((t) => t.id === tabId)));

  selectTab(tab: Tab): void {
    this.facade.selectTab(tab.id);
  }
}
