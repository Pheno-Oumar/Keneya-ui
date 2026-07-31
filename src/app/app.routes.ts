import { Routes } from '@angular/router';

import { Accueil } from './features/accueil/accueil';
import { LoginComponent } from './features/auth/login/login-component';
import { Register } from './features/auth/register/register';

import { CitoyenLayout } 
from './core/layout/citoyen-layout/citoyen-layout/citoyen-layout';

import { AdminLayout } 
from './core/layout/admin-layout/admin-layout/admin-layout';

import { AgentLayout } 
from './core/layout/agent-layout/agent-layout/agent-layout';

import { authGuardGuard } from './core/guards/auth.guard-guard';

import { Citoyen } 
from './features/dashboard/citoyen/citoyen';

import { RappelPage } 
from './features/rappels/rappel-page/rappel-page';


import { CategorieActiviteComponent } 
from './shared/components/categorie-activite-component/categorie-activite-component';

import { CategorieConseilComponent } 
from './shared/components/categorie-conseil-component/categorie-conseil-component';

import { AgentComponent } 
from './shared/components/agent-component/agent-component';


import { PublicationComponent } 
from './shared/components/forms-rappel/publication-component/publication-component';


// Si tu as un guard
// import { authGuardGuard } from './core/guards/auth.guard-guard';



export const routes: Routes = [

  /*
  =====================
       ACCUEIL
  =====================
  */

  {
    path:'',
    component:Accueil
  },


  /*
  =====================
       AUTH
  =====================
  */

  {
    path:'login',
    component:LoginComponent
  },

  {
    path:'register',
    component:Register
  },



  /*
  =====================
       CITOYEN
  =====================
  */

  {
    path:'citoyen',
    component:CitoyenLayout,
    canActivate:[authGuardGuard],
    data: { roles: ['CITOYEN'] },

    children:[

      {
        path:'',
        component:Citoyen
      },


      {
        path:'rappels',
        component:RappelPage
      },


      {
        path:'activites',
        component:CategorieActiviteComponent
      },


      {
        path:'conseils',
        component:CategorieConseilComponent
      },


      {
        path:'publications',
        component:PublicationComponent
      }

    ]
  },




  /*
  =====================
          ADMIN
  =====================
  */

  {
    path:'admin',
    component:AdminLayout,
    canActivate:[authGuardGuard],
    data: { roles: ['ADMIN'] },

    children:[

      {
        path:'',
        component:Citoyen
      },


      {
        path:'categories-activite',
        component:CategorieActiviteComponent
      },


      {
        path:'categories-conseil',
        component:CategorieConseilComponent
      },


      {
        path:'agents',
        component:AgentComponent
      }

    ]
  },




  /*
  =====================
          AGENT
  =====================
  */


  {
    path:'agent',
    component:AgentLayout,
    canActivate:[authGuardGuard],
    data: { roles: ['AGENT'] },

    children:[


      {
        path:'',
        component:Citoyen
      },


      {
        path:'publications',
        component:PublicationComponent
      },


      {
        path:'activites',
        component:CategorieActiviteComponent
      },


      {
        path:'categories-conseil',
        component:CategorieConseilComponent
      }


    ]
  },




  /*
  =====================
       PAGE INCONNUE
  =====================
  */

  {
    path:'**',
    redirectTo:''
  }

];
