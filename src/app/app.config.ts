import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withInMemoryScrolling} from '@angular/router';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import {Noir} from './utils/noir';
import {provideHttpClient} from '@angular/common/http';
import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideRouter(routes, withInMemoryScrolling({
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })),
    providePrimeNG({
      theme: {
        preset: Noir,
        options: {
          darkModeSelector: '.my-app-dark',
        },
      },
    })

  ],
};
