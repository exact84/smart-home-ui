import { Routes } from '@angular/router';
import { Layout } from '@components/layout/layout';
import { Login } from '@components/login/login';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'dashboard/:dashboardId/:tabId',
        loadComponent: () =>
          import('@components/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'dashboard/:dashboardId',
        loadComponent: () =>
          import('@components/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('@components/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: '**',
    loadComponent: () =>
      import('@components/not-found/not-found').then((m) => m.NotFound),
  },
];
