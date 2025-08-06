import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../sidebar/sidebar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-layout',
  imports: [
    CommonModule,
    Sidebar,
    RouterOutlet,
    MatIconModule,
    MatSidenavModule,
  ],
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
