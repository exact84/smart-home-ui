import { Routes } from '@angular/router';
import { Layout } from '@components/layout/layout';
import { Login } from '@components/login/login';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard/:dashboardId/:tabId',
        loadComponent: () =>
          import('@components/dashboard/dashboard').then((m) => m.Dashboard),
        canActivate: [authGuard],
      },
      {
        path: 'dashboard/:dashboardId',
        loadComponent: () =>
          import('@components/dashboard/dashboard').then((m) => m.Dashboard),
        canActivate: [authGuard],
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('@components/dashboard/dashboard').then((m) => m.Dashboard),
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('@components/not-found/not-found').then((m) => m.NotFound),
  },
];
