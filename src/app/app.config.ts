import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      // Route params and query params bind directly to component inputs
      withComponentInputBinding(),
      // Scroll to the top when the page changes
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
    ),
  ],
};
