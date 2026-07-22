import { Routes } from '@angular/router';
import { App } from './app';
import { Accueil } from './features/accueil/accueil';
import { LoginComponent } from './features/auth/login/login-component';
import { Register } from './features/auth/register/register';
import { CitoyenLayout } from './layout/citoyen-layout/citoyen-layout/citoyen-layout';
import { Citoyen } from './features/dashboard/citoyen/citoyen';
import { Test } from './features/test/test';
import { RappelPage } from './features/rappel-page/rappel-page';
import { authGuardGuard } from './core/guards/auth.guard-guard';

export const routes: Routes = [
  {
    path: '',
    component: Accueil,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'citoyen',
    component: CitoyenLayout,
    canActivate: [authGuardGuard],

    children: [
      {
        path: '',
        component: Citoyen,
      },
      {
        path: 'test',
        component: Test,
      },
      {
        path: 'rappels',
        component: RappelPage,
      },
    ],
  },
];
