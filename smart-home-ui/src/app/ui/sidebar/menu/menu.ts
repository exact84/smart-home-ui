import { Component } from '@angular/core';
import { Overview } from './overview/overview';
import { About } from './about/about';

@Component({
  selector: 'app-menu',
  imports: [Overview, About],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {}
