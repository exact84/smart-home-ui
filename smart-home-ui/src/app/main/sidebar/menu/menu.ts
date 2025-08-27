import { Component } from '@angular/core';
import { DashboardMenu } from './dashboard-menu/dashboard-menu';

@Component({
  selector: 'app-menu',
  imports: [DashboardMenu],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {}
