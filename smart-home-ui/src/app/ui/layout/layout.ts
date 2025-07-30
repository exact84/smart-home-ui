import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../sidebar/sidebar';
import { Dashboard } from '../dashboard/dashboard';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  standalone: true,
  selector: 'app-layout',
  imports: [CommonModule, Sidebar, Dashboard, MatIconModule, MatSidenavModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  isDesktop = window.innerWidth > 800;
  isSidebarOpened = false;

  @HostListener('window:resize')
  onResize() {
    this.isDesktop = window.innerWidth > 800;
  }
}
