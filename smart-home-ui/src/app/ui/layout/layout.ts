import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { NgComponentOutlet } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../sidebar/sidebar';
import { Dashboard } from '../dashboard/dashboard';

@Component({
  standalone: true,
  selector: 'app-layout',
  imports: [CommonModule, NgComponentOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  components = [Sidebar, Dashboard];
}
