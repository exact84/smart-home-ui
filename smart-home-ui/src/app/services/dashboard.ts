import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { DashboardList } from '@models/dashboard-list.model';
import { DashboardData } from '@models/dashboard.model';
import { BASE_API_URL } from 'app/constants/base-url';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  dashboardList = signal<DashboardList[]>([]);
  http: HttpClient = inject(HttpClient);

  getDashboardList() {
    return this.http.get<DashboardList[]>(`${BASE_API_URL}dashboards`);
  }

  getDashboardData(dashboardId: string) {
    return this.http.get<DashboardData>(
      `${BASE_API_URL}dashboards/${dashboardId}`,
    );
  }
  checkDashboardUnique(id: string, title: string): Observable<boolean> {
    return this.getDashboardList().pipe(
      map(
        (dashboards) =>
          !dashboards.some(
            (d) => d.id === id.trim() || d.title === title.trim(),
          ),
      ),
    );
  }

  createDashboard(dashboard: DashboardList) {
    return this.http.post<DashboardList>(
      `${BASE_API_URL}dashboards`,
      dashboard,
    );
  }

  deleteDashboard(dashboardId: string) {
    return this.http
      .delete<void>(`${BASE_API_URL}dashboards/${dashboardId}`)
      .pipe(
        tap(() => {
          this.dashboardList.update((dashboards) =>
            dashboards.filter((d) => d.id !== dashboardId),
          );
        }),
      );
  }
}
