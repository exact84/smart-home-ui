import { Component, signal } from '@angular/core';
import { Layout } from './ui/layout/layout';

@Component({
  selector: 'app-root',
  imports: [Layout],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Smart Home');
}
