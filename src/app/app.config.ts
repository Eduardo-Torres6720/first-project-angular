import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';

import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { userAuthenticatedGuard } from './services/guards/user-authenticated.guard';
import { userNotAuthenticatedGuard } from './services/guards/user-not-authenticated.guard';
import { TokenInterceptor } from './services/interceptors/token.interceptor';
import { errorInterceptor } from './services/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
      withInterceptors([TokenInterceptor, errorInterceptor])
    ),
    provideToastr(),
    provideAnimations(),
    userAuthenticatedGuard,
    userNotAuthenticatedGuard,
  ],
};
