import { Component, Inject, inject, signal } from '@angular/core';
import { Tab } from '@models/index';
import { CardList } from '../card-list/card-list';
import { DashboardService } from '@services/dashboard';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';
import { selectTabId, selectTabs } from '@store/dashboard/dashboard.selectors';
import { AsyncPipe } from '@angular/common';
import { DashboardFacade } from '@store/dashboard/dashboard.facade';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '@components/ui/confirm-dialog/confirm-dialog';
import { deleteDashboard } from '@store/dashboard-list/dashboard-list.actions';

@Component({
  selector: 'app-tab-switcher',
  imports: [CardList, AsyncPipe, MatIconModule],
  templateUrl: './tab-switcher.html',
  styleUrl: './tab-switcher.scss',
})
export class TabSwitcher {
  dashboard = inject(DashboardService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  private store = inject(Store);
  dialog = inject(MatDialog);
  facade: DashboardFacade = inject(DashboardFacade);

  readonly tabs$ = this.store.select(selectTabs);
  readonly activeTab$ = combineLatest([
    this.store.select(selectTabId),
    this.tabs$,
  ]).pipe(map(([tabId, tabs]) => tabs.find((t) => t.id === tabId)));

  selectTab(tab: Tab): void {
    this.facade.selectTab(tab.id);
  }
  onEditDashboardClick() {
    // this.facade.toggleEditMode();
    throw new Error('Method not implemented.');
  }
  onRemoveDashboardClick() {
    const confirmDialog = this.dialog.open(ConfirmDialog, {
      width: '300px',
      data: { message: 'Delete dashboard?' },
    });

    confirmDialog.afterClosed().subscribe((result) => {
      if (result) {
        const dashboardId = this.route.snapshot.params['dashboardId'];
        console.log('Удаляем: ', dashboardId);
        this.store.dispatch(deleteDashboard({ dashboardId }));
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
