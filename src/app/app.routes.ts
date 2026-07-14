import { Routes } from '@angular/router';
import { App } from './app';
import { Accueil } from './features/accueil/accueil';
import { LoginComponent } from './features/auth/login/login-component';
import { Register } from './features/auth/register/register';
import { CitoyenSidenav } from './layout/sidenav/citoyen-sidenav/citoyen-sidenav';

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
    }
];
