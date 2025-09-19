import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../sidebar/sidebar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { SIDEBAR_DESKTOP_BREAKPOINT } from 'app/constants/screen-size';

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
  isDesktop = window.innerWidth > SIDEBAR_DESKTOP_BREAKPOINT;
  isSidebarOpened = false;

  @HostListener('window:resize')
  onResize() {
    this.isDesktop = window.innerWidth > SIDEBAR_DESKTOP_BREAKPOINT;
  }
}
