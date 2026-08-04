import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth-service';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar-citoyen',
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './citoyen-sidenav.html',
  styleUrl: './citoyen-sidenav.css',
})
export class CitoyenSidenav {
  auth = inject(AuthService);
  router = inject(Router);
  menuItems: MenuItem[] = [
    { label: 'Tableau de board', icon: 'home', route: '/citoyen' },
    { label: 'Rappels', icon: 'alarm', route: 'rappels' },
<<<<<<< HEAD
    { label: 'Agents de santé', icon: 'medical_services', route: '/agents' },
    { label: 'Activités physiques', icon: 'local_activity', route: '/activites' },
    { label: 'Conseils', icon: 'shield', route: '/conseils' },
    { label: 'Publications', icon: 'book', route: '/publications' },
    { label: 'Statistiques', icon: 'bar_chart', route: '/statistiques' },
=======
    { label: 'Conseils', icon: 'shield', route: '/citoyen/conseils' },
    { label: 'Publications', icon: 'book', route: '/citoyen/publications' },
    { label: 'Activites', icon: 'list', route: '/citoyen/activites' },
    { label: 'Activite planning', icon: 'bar_chart', route: '/citoyen/activites-planning' },
    { label: 'Plans', icon: 'assignment', route: '/citoyen/plans' },
>>>>>>> 9223e7748230b867f05cfe1c2ab64c706a0f911e
  ];

  deconnexion(): void {
    this.auth.logout().subscribe({
      next: (res) => {
        this.router.navigate(['/login']);
      },
      error: (res) => console.log(res),
    });
  }
}
