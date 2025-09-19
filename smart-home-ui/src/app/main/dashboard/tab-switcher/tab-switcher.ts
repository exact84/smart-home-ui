import { Component, computed, inject, signal } from '@angular/core';
import { Tab } from '@models/index';
import { CardList } from '../card-list/card-list';
import { DashboardService } from '@services/dashboard';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, first, map, of, switchMap } from 'rxjs';
import { selectTabId, selectTabs } from '@store/dashboard/dashboard.selectors';
import { AsyncPipe } from '@angular/common';
import { DashboardFacade } from '@store/dashboard/dashboard.facade';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '@components/ui/confirm-dialog/confirm-dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { selectCards } from '@store/dashboard/dashboard.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-tab-switcher',
  imports: [
    CardList,
    AsyncPipe,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './tab-switcher.html',
  styleUrl: './tab-switcher.scss',
})
export class TabSwitcher {
  dashboard = inject(DashboardService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  store = inject(Store);
  dialog = inject(MatDialog);
  facade: DashboardFacade = inject(DashboardFacade);

  dashboardId = this.route.snapshot.params['dashboardId'];
  tabId = this.route.snapshot.params['tabId'];
  activeId = signal<string | undefined>(undefined);
  readonly tabs$ = this.store.select(selectTabs);
  readonly activeTab$ = combineLatest([
    this.store.select(selectTabId),
    this.tabs$,
  ]).pipe(map(([tabId, tabs]) => tabs.find((t) => t.id === tabId)));
  editableTabs = signal<Tab[]>([]);
  private tabTitles = new Map<string, string>();
  readonly cards$ = this.activeTab$.pipe(
    map((tab) => (tab ? selectCards(tab.id) : undefined)),
    switchMap((selector) => (selector ? this.store.select(selector) : of([]))),
  );

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      this.activeId.set(params.get('dashboardId') || undefined);
    });
  }

  activeTitle = computed(() => {
    if (!this.activeId()) return '';
    return (
      this.dashboard.dashboardList().find((d) => d.id === this.activeId())
        ?.title ?? ''
    );
  });

  selectTab(tab: Tab): void {
    if (this.facade.editMode()) return;
    this.facade.selectTab(tab.id);
    console.log(
      'From tab switcher, selected dashboard',
      this.facade.dashboardData$,
    );
    console.log('From tab switcher, selected tab', tab);
  }
  onEditDashboardClick() {
    this.tabs$
      .subscribe((tabs) => {
        this.editableTabs.set(tabs.map((t) => ({ ...t })));
      })
      .unsubscribe();
    this.facade.toggleEditMode();
  }
  onRemoveDashboardClick() {
    const confirmDialog = this.dialog.open(ConfirmDialog, {
      width: '300px',
      data: { message: 'Delete dashboard?' },
    });

    confirmDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.facade.deleteDashboard(this.dashboardId);
        this.router.navigate(['/dashboard']);
      }
    });
  }

  onDiscardEditDashboardClick() {
    this.facade.toggleEditMode();
    if (this.facade.newTab()) this.tabId = '';
    this.facade.newTab.set(false);
    this.facade.loadDashboard(this.dashboardId, this.tabId);
  }

  onSaveEditDashboardClick() {
    this.tabs$.pipe(first()).subscribe((tabs) => {
      const updatedTabs = tabs.map((tab) => ({
        ...tab,
        title: this.tabTitles.get(tab.id) ?? tab.title,
      }));

      const currentDashboardId = this.activeId();
      if (currentDashboardId) {
        this.facade.updateDashboard(currentDashboardId, updatedTabs);
      }
      this.facade.toggleEditMode();
      this.facade.newTab.set(false);
      this.tabTitles.clear();
    });
  }

  onAddTabClick() {
    this.facade.addTab('newTab');
  }

  onTabTitleChange(tabId: string, event: Event) {
    const newTitle = (event.target as HTMLInputElement).value;
    this.tabTitles.set(tabId, newTitle);
  }

  onReorderTabClick(tabId: string, direction: 'left' | 'right') {
    this.facade.reorderTab(tabId, direction);
  }

  onRemoveTabClick(tabId: string) {
    this.facade.removeTab(tabId);
  }
}
