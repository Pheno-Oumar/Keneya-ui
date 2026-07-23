import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
<<<<<<< HEAD
import { provideHttpClient } from '@angular/common/http';
=======
import { AuthService } from './core/services/auth-service';
import { firstValueFrom } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

export function initAuth(authService: AuthService) {
  return () => firstValueFrom(authService.cheickSession());
}

>>>>>>> fe5e72181e2dd4a81360e6b5fa2283508068ae03
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
<<<<<<< HEAD
    provideHttpClient()
  ]
=======
    provideHttpClient(),
    provideAppInitializer(() => initAuth(inject(AuthService))()),
  ],
>>>>>>> fe5e72181e2dd4a81360e6b5fa2283508068ae03
};
