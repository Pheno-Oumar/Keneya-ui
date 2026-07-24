import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthService } from './core/services/auth-service';
import { firstValueFrom } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

export function initAuth(authService: AuthService) {
  return () => firstValueFrom(authService.cheickSession());
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideAppInitializer(() => initAuth(inject(AuthService))()),
  ],
};
