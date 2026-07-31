import {
  ApplicationConfig,
  ErrorHandler,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from '../../app.routes';

import { AuthService } from '../auth/auth-service';
import { GlobalErrorHandler } from '../errors/global-error-handler';

import { firstValueFrom } from 'rxjs';


export function initAuth(authService: AuthService) {
  return () => firstValueFrom(authService.checkSession());
}


export const appConfig: ApplicationConfig = {

  providers: [

    // Gestion des erreurs globales Angular
    provideBrowserGlobalErrorListeners(),

    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },


    // Routing
    provideRouter(routes),


    // HTTP Client
    provideHttpClient(),


    // Vérification session au démarrage
    provideAppInitializer(
      () => initAuth(inject(AuthService))()
    ),

  ],

};
