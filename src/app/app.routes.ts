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
import { ConseilComponent } from './shared/component/conseil-component/conseil-component';
import { PublicationComponent } from './shared/component/publication-component/publication-component';
import { ActiviteComponent } from './shared/component/activite-component/activite-component';
import { DahbordAdminComponent } from './shared/component/dahbord-admin-component/dahbord-admin-component';
import { DahbordAgentComponent } from './shared/component/dahbord-agent-component/dahbord-agent-component';
import { PublicationAdminComponent } from './shared/component/publication-admin-component/publication-admin-component';
import { ConseilAdminComponent } from './shared/component/conseil-admin-component/conseil-admin-component';
import { ActiviteCitoyenComponent } from './shared/component/activite-citoyen-component/activite-citoyen-component';
import { ActivitePanierComponent } from './shared/component/activite-panier-component/activite-panier-component';
import { CitoyenPublication } from './shared/component/citoyen-publication/citoyen-publication';
import { Conseil } from './shared/component/conseil/conseil';


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

    children: [
      {
        path: '',
        component: Citoyen,
      },
      {
        path: 'activites',
        component: ActiviteCitoyenComponent
      },
      {
        path: 'rappels',
        component: RappelPage
      },
      {
        path: 'conseils',
        component: Conseil
      },
      {
        path: 'publications',
        component: CitoyenPublication
      },
      {
        path: 'activites-planning',
        component: ActivitePanierComponent
      },
    ],
  },
  {
    path: "admin", component: AdminLayout,
    children: [
      {
        path: "", component: DahbordAdminComponent
      }
      , {
        path: "categories-activite", component: CategorieActiviteComponent
      },
      {
        path: "categories-conseil", component: CategorieConseilComponent
      },
      {
        path: "agents", component: AgentComponent
      },
      {
        path: "publications", component: PublicationAdminComponent
      },
      {
        path: "conseils", component: ConseilAdminComponent
      }
    ]
  },
  {
    path: "agent", component: AgentLayout,
    children: [
      {
        path: "", component: DahbordAgentComponent
      }
      , {
        path: "publications", component: PublicationComponent
      },
      {
        path: "conseils", component: ConseilComponent
      },
      {
        path: "activites", component: ActiviteComponent
      },

    ]
  }
];
