import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { DashboardList } from '@models/dashboard-list.model';
import { DashboardData } from '@models/dashboard.model';
import { BASE_API_URL } from 'app/constants/base-url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  dashboardList = signal<DashboardList[]>([]);
  http: HttpClient = inject(HttpClient);

  getDashboardList(): Observable<DashboardList[]> {
    return this.http.get<DashboardList[]>(`${BASE_API_URL}dashboards`);
  }

  getDashboardData(dashboardId: string) {
    return this.http.get<DashboardData>(
      `${BASE_API_URL}dashboards/${dashboardId}`,
    );
  }
}
