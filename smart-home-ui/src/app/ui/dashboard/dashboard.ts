import { Component } from '@angular/core';
import { TabSwitcher } from './tab-switcher/tab-switcher';

@Component({
  selector: 'app-dashboard',
  imports: [TabSwitcher],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}
