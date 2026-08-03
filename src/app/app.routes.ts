import { Routes } from '@angular/router';
import { App } from './app';
import { Accueil } from './features/accueil/accueil';
import { LoginComponent } from './features/auth/login/login-component';
import { Register } from './features/auth/register/register';
import { CitoyenLayout } from './layout/citoyen-layout/citoyen-layout/citoyen-layout';
import { Citoyen } from './features/dashboard/citoyen/citoyen';
import { Test } from './features/test/test';
import { RappelsList } from './features/rappels-list/rappels-list';
import { AgentsListComponent } from './features/agents-list/agents-list';

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
        path: "citoyen", component: CitoyenLayout ,
         children:[
            {
                path: "", component: Citoyen
            }
            ,{
                path: "test" , component:Test
            }
            
        ]
        },{ 
                path: 'rappels', 
                component: RappelsList 
            },{
                path: 'agents',
                component: AgentsListComponent
            },
];
