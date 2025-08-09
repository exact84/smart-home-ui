import { Routes } from '@angular/router';
import { Layout } from '@components/layout/layout';
import { Dashboard } from '@components/dashboard/dashboard';
import { NotFound } from '@components/not-found/not-found';
import { Login } from '@components/login/login';

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
  {
    path: 'login',
    component: Login,
  },
  {
    path: '**',
    component: NotFound,
  },
];
