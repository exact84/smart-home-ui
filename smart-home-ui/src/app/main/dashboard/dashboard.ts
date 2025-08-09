import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabSwitcher } from './tab-switcher/tab-switcher';
import { HttpClient } from '@angular/common/http';
import { DashboardData } from '@models/index';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [TabSwitcher, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private http = inject(HttpClient);
  data: DashboardData = {
    tabs: [],
  };

  ngOnInit() {
    this.http.get<DashboardData>('mock-data.json').subscribe((data) => {
      this.data = data;
    });
  }
}
