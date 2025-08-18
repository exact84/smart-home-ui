import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { DashboardList } from '@models/dashboard-list.model';
import { DashboardData } from '@models/dashboard.model';
import { BASE_API_URL } from 'app/constants/base-url';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  dashboardList = signal<DashboardList[]>([]);
  selectedDashboard = signal<DashboardList>({ id: '', title: '', icon: '' });
  selectedTab = signal<string>('');
  dashboardData = signal<{ dashboardId: string; tabs: DashboardData['tabs'] }>({
    dashboardId: '',
    tabs: [],
  });
  http: HttpClient = inject(HttpClient);

  getDashboardList(currentDashboardId?: string) {
    this.http
      .get<DashboardList[]>(`${BASE_API_URL}dashboards`)
      .subscribe((list) => {
        this.dashboardList.set(list);
        if (list.length) {
          const found = currentDashboardId
            ? list.find((d) => d.id === currentDashboardId)
            : undefined;

          this.selectDashboard(found ?? list[0]);
        }
      });
  }

  selectDashboard(dashboard: DashboardList) {
    if (this.selectedDashboard()?.id === dashboard.id) return;
    this.selectedDashboard.set(dashboard);
    this.getDashboardData(dashboard.id);
  }

  setTab(tabId: string) {
    this.selectedTab.set(tabId);
  }

  getDashboardData(dashboardId: string) {
    this.http
      .get<DashboardData>(`${BASE_API_URL}dashboards/${dashboardId}`)
      .subscribe((data) => {
        this.dashboardData.set({
          dashboardId,
          tabs: data.tabs,
        });
      });
  }
}
