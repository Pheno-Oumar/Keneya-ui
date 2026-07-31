import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../auth/auth-service';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar-citoyen',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIconModule
  ],
  templateUrl: './citoyen-sidenav.html',
  styleUrls: ['./citoyen-sidenav.css'],
})
export class CitoyenSidenav {

  auth = inject(AuthService);
  router = inject(Router);

  menuItems: MenuItem[] = [

    {
      label: 'Tableau de bord',
      icon: 'home',
      route: '/citoyen'
    },

    {
      label: 'Rappels',
      icon: 'alarm',
      route: '/citoyen/rappels'
    },

    {
      label: 'Activités physiques',
      icon: 'local_activity',
      route: '/citoyen/activites'
    },

    {
      label: 'Conseils',
      icon: 'shield',
      route: '/citoyen/conseils'
    },

    {
      label: 'Publications',
      icon: 'book',
      route: '/citoyen/publications'
    },

   /* {
      label: 'Statistiques',
      icon: 'bar_chart',
      route: '/citoyen/statistiques'
    }*/

  ];


  deconnexion(): void {

    this.auth.logout().subscribe({

      next: () => {

        console.log("✅ Déconnexion réussie");

        this.router.navigate(['/login']);

      },

      error: (err) => {

        console.error("❌ Erreur déconnexion :", err);

      }

    });

  }

}


