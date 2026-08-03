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
    { label: 'Agents de santé', icon: 'medical_services', route: '/agents' },
    { label: 'Activités physiques', icon: 'local_activity', route: '/activites' },
    { label: 'Conseils', icon: 'shield', route: '/conseils' },
    { label: 'Publications', icon: 'book', route: '/publications' },
    { label: 'Statistiques', icon: 'bar_chart', route: '/statistiques' },
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
