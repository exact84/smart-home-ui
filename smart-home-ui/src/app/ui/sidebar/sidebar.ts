import { Component } from '@angular/core';
import { Header } from './header/header';
import { Menu } from './menu/menu';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-sidebar',
  imports: [Header, Menu, Footer],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {}
