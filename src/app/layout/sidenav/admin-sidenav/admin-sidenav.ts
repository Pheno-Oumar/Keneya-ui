import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-admin-sidenav',
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './admin-sidenav.html',
  styleUrl: './admin-sidenav.css',
})
export class AdminSidenav {

  auth = inject(AuthService);
  router = inject(Router);
  menuItems: MenuItem[] = [
    { label: 'Tableau de board', icon: 'home', route: '/admin/' },
    { label: 'Agents', icon: 'groups', route: '/admin/agents' },
    { label: 'Categories activite', icon: 'category', route: '/admin/categories-activite' },
    { label: 'Categories conseil', icon: 'category', route: '/admin/categories-conseil' },
    { label: 'Statistiques', icon: 'bar_chart', route: '/admin/statistiques' },
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
interface MenuItem {
  label: string;
  icon: string;
  route: string;
}