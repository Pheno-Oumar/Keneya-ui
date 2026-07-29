import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderCitoyen } from '../../header/header-citoyen/header-citoyen';
import { AdminSidenav } from '../../sidenav/admin-sidenav/admin-sidenav';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet,AdminSidenav],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.css'],
})
export class AdminLayout {}



