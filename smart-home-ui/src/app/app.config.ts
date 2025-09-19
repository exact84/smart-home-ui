import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth-interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { dashboardReducer } from './store/dashboard/dashboard.reducer';
import { DashboardEffects } from './store/dashboard/dashboard.effects';
import { dashboardListReducer } from './store/dashboard-list/dashboard-list.reducer';
import { DashboardListEffects } from './store/dashboard-list/dashboard-list.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { itemListReducer } from '@store/item-list/item-list.reducer';
import { ItemListEffects } from '@store/item-list/ItemList.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(StoreRouterConnectingModule.forRoot()),
    provideStore({
      dashboard: dashboardReducer,
      dashboardList: dashboardListReducer,
      itemList: itemListReducer,
    }),
    provideEffects([DashboardEffects, DashboardListEffects, ItemListEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
};
