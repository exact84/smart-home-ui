import { Routes } from '@angular/router';
import { Layout } from './main/layout/layout';
import { Dashboard } from './main/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'dashboard/:id',
        component: Dashboard,
      },
      {
        path: '',
        redirectTo: '/dashboard/overview',
        pathMatch: 'full',
      },
    ],
  },
];
