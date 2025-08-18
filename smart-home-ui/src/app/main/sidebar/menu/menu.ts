import { Component } from '@angular/core';
import { DashboardMenu } from './dashboard-menu/dashboard-menu';
import { About } from './about/about';

@Component({
  selector: 'app-menu',
  imports: [DashboardMenu, About],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {}
