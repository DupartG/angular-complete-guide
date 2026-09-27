import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(), //allow path variable to be injected inside a component
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      }), //allow inheritance on path variable
    ),
  ],
};
