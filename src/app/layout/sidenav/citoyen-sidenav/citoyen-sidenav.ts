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
    { label: 'Conseils', icon: 'shield', route: '/citoyen/conseils' },
    { label: 'Publications', icon: 'book', route: '/citoyen/publications' },
    { label: 'Activites', icon: 'list', route: '/citoyen/activites' },
    { label: 'Activite planning', icon: 'bar_chart', route: '/citoyen/activites-planning' },
    { label: 'Plans', icon: 'assignment', route: '/citoyen/plans' },
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
