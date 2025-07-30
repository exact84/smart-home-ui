import { Routes } from '@angular/router';
import { Layout } from './ui/layout/layout';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: Layout,
    // children: [],
  },
  // {
  //   path: 'card-list',
  //   loadComponent: () => import('./card-list/card-list').then((m) => m.CardList),
  // },
];
