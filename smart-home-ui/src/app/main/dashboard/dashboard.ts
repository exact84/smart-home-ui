import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabSwitcher } from './tab-switcher/tab-switcher';
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
  error$ = this.facade.error$;
  loading$ = this.facade.loading$;
}
