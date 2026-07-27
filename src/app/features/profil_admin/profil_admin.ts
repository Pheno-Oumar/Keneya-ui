// import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { AdminSidenav } from '../../layout/sidenav/admin-sidenav/admin-sidenav';
import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';


@Component({
  selector: 'app-profile_admin',
  standalone: true,
  imports: [
    RouterOutlet,
    AdminSidenav,
    RouterModule,
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl:'./profil_admin.html',
  styleUrls: ['./profil_admin.css']
})

 export class ProfileAdmin{
}