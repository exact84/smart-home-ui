import { Routes } from '@angular/router';
import { Layout } from './ui/layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [],
  },
];
