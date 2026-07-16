import { Routes } from '@angular/router';
import { App } from './app';
import { Accueil } from './features/accueil/accueil';
import { LoginComponent } from './features/auth/login/login-component';
import { Register } from './features/auth/register/register';
import { CitoyenSidenav } from './layout/sidenav/citoyen-sidenav/citoyen-sidenav';
import { PlanListComponent } from './features/citoyen-activite-plan/plan-list/plan-list';
import { PlanAddComponent} from './features/citoyen-activite-plan/plan-add/plan-add';
import { PlanEditComponent } from './features/citoyen-activite-plan/plan-edit/plan-edit';
import { PlanDetailComponent } from './features/citoyen-activite-plan/plan-detail/plan-detail';

export const routes: Routes = [
    {
        path: '', component: Accueil
    },
    {
        path: "login", component: LoginComponent
    },
    {
        path: "register", component: Register
    },
    {
        path: "citoyen", component: CitoyenSidenav
    },
    {
        path: "plan", component: PlanListComponent 
    },
    { 
        path: 'nouveau-plan', component: PlanAddComponent 
    },

    { 
        path: 'modifier-plan', component: PlanEditComponent
    },
    { 
        path: 'detail-plan', component: PlanDetailComponent
    }
];
