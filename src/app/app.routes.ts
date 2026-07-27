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
import { AdminLayout } from './layout/admin-layout/admin-layout/admin-layout';
import { CategorieActiviteComponent } from './shared/component/categorie-activite-component/categorie-activite-component';
import { CategorieConseilComponent } from './shared/component/categorie-conseil-component/categorie-conseil-component';
import { AgentComponent } from './shared/component/agent-component/agent-component';
import { AgentLayout } from './layout/agent-layout/agent-layout/agent-layout';
import { ConseilComponent } from './shared/component/activite-component/activite-component';
import { DahbordAdminComponent } from './shared/component/dahbord-admin-component/dahbord-admin-component';
import { PublicationComponent } from './shared/component/publication-component/publication-component';
import { ProfileAdmin } from './features/profil_admin/profil_admin';
import { ProfilCitoyen } from './features/profile_citoyen/profile_citoyen';
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
      {
        path: 'profilCitoyen',
        component: ProfilCitoyen,
      },
    ],
  },
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      {
        path: '',
        component: Citoyen,
      },
      {
        path: 'categories-activite',
        component: CategorieActiviteComponent,
      },
      {
        path: 'categories-conseil',
        component: CategorieConseilComponent,
      },
      {
        path: 'agents',
        component: AgentComponent,
      },
      {
        path: 'profile',
        component: ProfilCitoyen,
      },
    ],
  },
  {
    path: 'agent',
    component: AgentLayout,
    children: [
      {
        path: '',
        component: Citoyen,
      },
      {
        path: 'publications',
        component: PublicationComponent,
      },
      {
        path: 'categories-conseil',
        component: CategorieConseilComponent,
      },
      {
        path: 'profile',
        component: ProfilCitoyen,
      },
    ],
  },
  {
    path: 'Profile_Admin',
    component: ProfileAdmin,
  },
  {
    path: 'Profile_Citoyen',
    component: ProfilCitoyen,
  },
];